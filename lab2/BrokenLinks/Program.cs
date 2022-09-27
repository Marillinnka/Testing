using HtmlAgilityPack;
using System;
using System.Net.Http;
using System.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;

namespace BrokenLinks
{
    class CheckBrokenLinks
    {
        private static List<string> validLinks = new List<string>();
        private static List<string> invalidLinks = new List<string>();
        private static List<string> allLinks = new List<string>();
        private static string fullLink;

        private static HttpClient client = new HttpClient();
        
        public CheckBrokenLinks(string link)
        {
            fullLink = link;  
        }

        public void CheckAllLinks()
        {
            CheckGetLinks(fullLink);
            allLinks.Add(fullLink);

            string url, answer;

            foreach (var address in allLinks)
            {
                url = address;
                if (!address.StartsWith("http://") && !address.StartsWith("https://"))
                    url = fullLink + address;

                using (var clientResponse = client.GetAsync(url).Result)
                {
                    int code = (int)clientResponse.StatusCode;
                    answer = $"{url} {code.ToString()} {clientResponse.StatusCode}";

                    if (CheckStatusCode(clientResponse))                    
                        validLinks.Add(answer);                    

                    else                 
                        invalidLinks.Add(answer);                    
                }
            }
        }

        private static void CheckGetLinks(string link)
        {
            try
            {
                GetLinks(link);
            }

            catch (System.ArgumentNullException)
            {
                return;
            }
        }

        private static void GetLinks(string link)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(link);
            HtmlNode[] htmlNodes = htmlDocument.DocumentNode.SelectNodes("//a").ToArray();

            foreach (HtmlNode node in htmlNodes)
            {
                string url = node.GetAttributeValue("href", null);
                if (!allLinks.Contains(url) && Uri.IsWellFormedUriString(url, UriKind.RelativeOrAbsolute))
                {
                    if (url.Contains(fullLink) || (!url.StartsWith("http://") && !url.StartsWith("https://") && !url.Contains(':')))
                    {
                        allLinks.Add(url);
                        CheckGetLinks(fullLink + url);
                    }
                }
            }
        }

        private static bool CheckStatusCode(HttpResponseMessage clientResponse)
        {
            int statusCode = (int)clientResponse.StatusCode;
            int MAX_STATUS = 400;
            int MIN_STATUS = 200;

            if (statusCode < MAX_STATUS && statusCode >= MIN_STATUS)
                return true;

            else
                return false;
        
        }

        public List<string> GetValidLinks() 
        {
            return validLinks;
        }

        public List<string> GetInvalidLinks()
        {
            return invalidLinks;
        }

    }
    class Program
    {
        private static readonly int ARGS_COUNT = 1;
        private static StreamWriter validFile = new StreamWriter("../../../valid.txt", false, Encoding.UTF8);
        private static StreamWriter invalidFile = new StreamWriter("../../../invalid.txt", false, Encoding.UTF8);
        private static string CheckArguments(string[] args)
        {
            if (args.Length != ARGS_COUNT)
                throw new Exception("Number of arguments - incorrect.");

            return args[0];
        }

        private static void WriteLinksInFile(StreamWriter stream, List<string> links)
        {
            foreach (var link in links)
                stream.WriteLine(link);

            stream.WriteLine("Count of links: " + links.Count());
            stream.WriteLine("Checking date: " + DateTime.Now);
        }

        
        static void Main(string[] args)
        {
            try
            {
                string link = CheckArguments(args);

                CheckBrokenLinks checkedLink = new CheckBrokenLinks(link);
                checkedLink.CheckAllLinks();

                WriteLinksInFile(validFile, checkedLink.GetValidLinks());
                WriteLinksInFile(invalidFile, checkedLink.GetInvalidLinks());
            }

            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            validFile.Close();
            invalidFile.Close();
        }
    }
}
