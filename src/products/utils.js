const excelGenerator = (products, res) => {
  const xl = require("excel4node");
  // Limpiando los datos para usarlos de una manera mejor
  products = products.map((product) => {
    let id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product,
    };
  });
  // Generamos el libro de excel
  let wb = new xl.Workbook();
  // Genera un hoja del excel
  let ws = wb.addWorksheet("inventario");

  for (let i = 1; i <= products.length; i++) {}
};
