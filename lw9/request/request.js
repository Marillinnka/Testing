import got from "got";

export default class Request {

  async getAllProducts() {
    const response = await got.get("http://shop.qatl.ru/api/products");
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async createProduct(data) {
    const response = await got.post("http://shop.qatl.ru/api/addproduct", { json: data });
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async editProduct(data) {
    const response = await got.post("http://shop.qatl.ru/api/editproduct", { json: data });
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async deleteProductById(id) {
    const response = await got.get("http://shop.qatl.ru/api/deleteproduct?id=" + id);
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }
}