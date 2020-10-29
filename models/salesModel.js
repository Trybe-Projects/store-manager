const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (saleItens) => {
  const conn = await connection();
  const sales = await conn.collection('sales').insertOne({ itensSold: saleItens });
  return sales.ops[0];
};

const getAllSales = async () => {
  const conn = await connection();
  return conn.collection('sales').find().toArray();
};

const getSaleById = async (id) => {
  const conn = await connection();
  return conn.collection('sales').findOne(ObjectId(id));
};

const updateSale = async (id, itensSold) => {
  const conn = await connection();
  const product = await conn
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return product;
};

const deleteSale = async (id) => {
  const conn = await connection();
  await conn.collection('sales').deleteOne({ _id: ObjectId(id) });
  return true;
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
