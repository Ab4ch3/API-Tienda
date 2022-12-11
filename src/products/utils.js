const excelGenerator = (products, name, res) => {
  const xl = require("excel4node");
  // Limpiando los datos para usarlos de una manera mejor
  products = products.map((product) => {
    let id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product.product,
    };
    // return {
    //   product: { id, ...product.product },
    // };
  });
  // console.log(products);
  let headingColumnIndex = 1;
  let headersExcel = Object.keys(products[0]);

  // Generamos el libro de excel
  let wb = new xl.Workbook();
  // Genera un hoja del excel
  let ws = wb.addWorksheet("inventario");

  headersExcel.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });

  let rowIndex = 2;
  products.forEach((product) => {
    let columnIndex = 1;
    Object.keys(product).forEach((productKey) => {
      ws.cell(rowIndex, columnIndex++)[typeof product[productKey]](
        product[productKey]
      );
    });
    rowIndex++;
  });

  wb.write(`${name}.xlsx`, res);
};

module.exports.ProdutsUtils = {
  excelGenerator,
};
