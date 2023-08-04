import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

const TablaPage = ({ estructura, datos }) => {
  return (
    <>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tabla de contactos</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              {estructura.map(col => (
                <th key={col} className="bg-gray-900 p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                {estructura.map(col => (
                  <td key={col} className="bg-gray-900 border-2 border-lime-400 p-2">
                    {fila[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export async function getServerSideProps() {
  // Consulta los datos del servidor Express
  const res = await fetch('http://localhost:3001/api/data');
  const { estructura, datos } = await res.json();

  return {
    props: { estructura, datos },
  };
}

export default TablaPage;