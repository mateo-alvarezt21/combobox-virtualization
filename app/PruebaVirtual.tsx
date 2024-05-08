import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Select from "react-select";

interface FollowUp {
  id: string;
  name: string;
  // Agrega otras propiedades si es necesario
}

export const PruebaVirtual = () => {
  const [names, setNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/v1/follow-ups?page=${currentPage}&size=${pageSize}`
        );
        const responseData = await response.json();
        const newNames = responseData.items.map((item: any) => item.name);

        // Convertir a un conjunto para eliminar duplicados
        const uniqueNamesSet = new Set([...names, ...newNames]);

        // Convertir el conjunto de nuevo a un array
        const uniqueNamesArray = Array.from(uniqueNamesSet);

        setNames(uniqueNamesArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Convertir los nombres en un formato aceptable para react-select
  const options = names.map((name) => ({ value: name, label: name }));
  console.log(options)                                                                                                                                                                                                                                                                                      

  return (
    <Select
      options={options}
      isLoading={loading}
      onMenuScrollToBottom={loadMoreData}
      
    />
  );
};
