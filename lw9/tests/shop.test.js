import assert from "node:assert/strict";
import Request from "../request/request.js";
import data from "./test_cases.js";


function compare(source, response) 
{
  assert(source.category_id == response.category_id, "category_id исходного товара не совпадает с category_id сервера");
  assert(source.title == response.title, "title исходного товара не совпадает с title сервера");
  assert(source.content == response.content, "content исходного товара не совпадает с content сервера");
  assert(source.price == response.price, "price исходного товара не совпадает с price сервера");
  assert(source.old_price == response.old_price, "old_price исходного товара не совпадает с old_price сервера");
  assert(source.status == response.status, "status исходного товара не совпадает с status сервера");
  assert(source.keywords == response.keywords, "keywords исходного товара не совпадает с keywords сервера");
  assert(source.description == response.description, "description исходного товара не совпадает с description сервера");
  assert(source.hit == response.hit, "hit исходного товара не совпадает с hit сервера");
}

function check(product) 
{
  assert("id" in product, "не удалось найти поле id в продукте");
  assert("category_id" in product, "не удалось найти поле category_id в продукте");
  assert("title" in product, "не удалось найти поле title в продукте");
  assert("alias" in product, "не удалось найти поле alias в продукте");
  assert("content" in product, "не удалось найти поле content в продукте");
  assert("price" in product, "не удалось найти поле price в продукте");
  assert("old_price" in product, "не удалось найти поле old_price в продукте");
  assert("status" in product, "не удалось найти поле status в продукте");
  assert("keywords" in product, "не удалось найти поле keywords в продукте");
  assert("description" in product, "не удалось найти поле description в продукте");
  assert("img" in product, "не удалось найти поле img в продукте");
  assert("hit" in product, "не удалось найти поле hit в продукте");
  assert("cat" in product, "не удалось найти поле cat в продукте");
}

describe("Интернет-магазин часов", function () {
  this.timeout(20000);

  const request = new Request();
  let idProducts = [];

  afterEach(function () 
  {
    idProducts.forEach(async function (id) {
      await request.deleteProductById(id);
    });
    idProducts = [];
  });

  it("Получение всех товаров", async function () {
    const response = await request.getAllProducts();

    response.body.forEach((shopProduct) => {
      check(shopProduct);
    });

    assert(!response.HTTPError, "Ошибка сервера");
    assert(response.body.length > 0, "Список товаров пуст");
  });

  it("Создание товара", async function () {
    const response = await request.createProduct(data.validProduct);
    idProducts.push(response.body.id);

    const products = (await request.getAllProducts()).body;

    const product = products.find(shopProduct => shopProduct.id == response.body.id);
    check(product);
    compare(data.validProduct, product)

    assert(!response.HTTPError, "Ошибка сервера");
    assert(response.body.status != 0, "Статус ответа - неудача");
    assert(response.body.id > 0, "Некорректный id");
  });

  it("Удаление товара", async function () {
    const createResponse = await request.createProduct(data.validProduct);
    idProducts.push(createResponse.body.id);

    const deleteResponse = await request.deleteProductById(createResponse.body.id);

    const products = (await request.getAllProducts()).body;

    assert(!deleteResponse.HTTPError, "Ошибка сервера");
    assert(deleteResponse.body.status != 0, "Статус ответа - неудача");
    assert(!products.find(shopProduct => shopProduct.id == createResponse.body.id), "Удалённый товар присутствует в списке товаров");
  });

  it("Редактирование товара", async function () {
    const createResponse = await request.createProduct(data.validProduct);
    idProducts.push(createResponse.body.id);

    var products = (await request.getAllProducts()).body;
    var editingProduct = products.find(shopProduct => shopProduct.id == createResponse.body.id);
    editingProduct = {...editingProduct, ...data.validUpdateProduct};

    const editResponse = await request.editProduct(editingProduct);
    products = (await request.getAllProducts()).body;
    var productAfterEdit = products.find(shopProduct => shopProduct.id == editingProduct.id);
    check(productAfterEdit);
    compare(data.validUpdateProduct, productAfterEdit);

    assert(!editResponse.HTTPError, "Ошибка сервера");
    assert(editResponse.body.status != 0, "Статус ответа - неудача");
    assert(createResponse.body.id == productAfterEdit.id, "id созданного товара и отредактированного товара различны");
  });

  it("Создание товара с невалидными данными", async function () { // Надо отправлять полностью невалидные данные
    const response = await request.createProduct(data.invalidProduct);
    idProducts.push(response.body.id);

    const products = (await request.getAllProducts()).body;
    const product = products.find(shopProduct => shopProduct.id == response.body.id);

    assert(!response.HTTPError, "Ошибка сервера");
    assert(response.body.status == 0, "Статус ответа - удача");
    assert(!product, "Невалидный товар присутствует в списке товаров");
  });

  it("Создание товара с пустыми данными", async function () {
  const response = await request.createProduct(data.emptyProduct);
  idProducts.push(response.body.id);

  const products = (await request.getAllProducts()).body;
  const product = products.find(shopProduct => shopProduct.id == response.body.id);

  assert(!response.HTTPError, "Ошибка сервера");
  assert(response.body.status == 0, "Статус ответа - удача");
  assert(!product, "Пустой товар присутствует в списке товаров");
  });

  it("Редактирование товара невалидными данными", async function () {
    const createResponse = await request.createProduct(data.validProduct);
    idProducts.push(createResponse.body.id);

    var products = (await request.getAllProducts()).body;
    var editingProduct = products.find(shopProduct => shopProduct.id == createResponse.body.id);
    editingProduct = {...editingProduct, ...data.invalidUpdateProduct};

    const editResponse = await request.editProduct(editingProduct);
    products = (await request.getAllProducts()).body;
    var productAfterEdit = products.find(shopProduct => shopProduct.id == editingProduct.id);

    assert(!editResponse.HTTPError, "Ошибка сервера");
    assert(editResponse.body.status == 0, "Статус ответа - удача");
    assert(invalidUpdateProduct.content != productAfterEdit.content, "Поле content в товаре было отредактировано невалидными данными"); // Изменить комментарии
    assert(invalidUpdateProduct.hit != productAfterEdit.hit, "Поле hit в товаре было отредактировано невалидными данными");
  });

  it("Редактирование несуществующего товара", async function () {
    const editResponse = await request.editProduct(data.nonexistentProduct);
    const products = (await request.getAllProducts()).body;
    var productAfterEdit = products.find(shopProduct => shopProduct.id == data.nonexistentProduct.id);

    assert(!editResponse.HTTPError, "Ошибка сервера");
    assert(editResponse.body.status == 0, "Статус ответа - неудача");
    assert(!productAfterEdit, "Невалидный товар присутствует в списке товаров");
  });

  it("Удаление несуществующего товара", async function () {
    const deleteResponse = await request.deleteProductById(data.nonexistentProduct.id);

    assert(!deleteResponse.HTTPError, "Ошибка сервера");
    assert(deleteResponse.body.status == 0, "Статус ответа - удача");
  });

  it('Генерация поля alias у создаваемых товаров', async () => {
    const responseFirst = await request.createProduct(data.validProduct);
    const responseSecond = await request.createProduct(data.validProduct);
    const responseThird = await request.createProduct(data.validProduct);
    idProducts.push(responseFirst.body.id);
    idProducts.push(responseSecond.body.id);
    idProducts.push(responseThird.body.id);

    const products = (await request.getAllProducts()).body;
    
    const productFirst = products.find(shopProduct => shopProduct.id == responseFirst.body.id);
    const productSecond = products.find(shopProduct => shopProduct.id == responseSecond.body.id);
    const productThird = products.find(shopProduct => shopProduct.id == responseThird.body.id);
    
    assert(productFirst.alias == "nice-watch",
    "Значение поля alias не соответствует формату 'заголовок'");
    
    assert(productSecond.alias == "nice-watch-0",
    "Значение поля alias не соответствует формату 'заголовок-0'");
    
    assert(productThird.alias == "nice-watch-0-0",
    "Значение поля alias не соответствует формату 'заголовок-0-0'");
    });
    
    
    it('Генерация поля alias у редактируемых товаров', async () => {
      const responseFirst = await request.createProduct(data.validProduct);
      const responseSecond = await request.createProduct(data.validProduct);
      const responseThird = await request.createProduct(data.validProduct);
      idProducts.push(responseFirst.body.id);
      idProducts.push(responseSecond.body.id);
      idProducts.push(responseThird.body.id);
      
      var products = (await request.getAllProducts()).body;
      
      var productFirst = products.find(shopProduct => shopProduct.id == responseFirst.body.id);
      await request.editProduct({ ...productFirst, ...data.validUpdateProduct });

      var productSecond = products.find(shopProduct => shopProduct.id == responseSecond.body.id);
      await request.editProduct({ ...productSecond, ...data.validUpdateProduct });

      var productThird = products.find(shopProduct => shopProduct.id == responseThird.body.id);
      await request.editProduct({ ...productThird, ...data.validUpdateProduct });
      
      products = (await request.getAllProducts()).body;
      productFirst = products.find(shopProduct => shopProduct.id == responseFirst.body.id);
      productSecond = products.find(shopProduct => shopProduct.id == responseSecond.body.id);
      productThird = products.find(shopProduct => shopProduct.id == responseThird.body.id);
      
      assert(productFirst.alias == "update",
      "Значение поля alias не соответствует формату 'заголовок'");
      
      assert(productSecond.alias == ("update-" + productSecond.id),
      "Значение поля alias не соответствует формату 'заголовок-id'");
      
      assert(productThird.alias == ("update-" + productThird.id),
      "Значение поля alias не соответствует формату 'заголовок-id'");
    });
});