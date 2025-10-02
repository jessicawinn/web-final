import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function BoxBasic() {
  return (
    <main>
      <Box component="section" className="border border-gray-800 m-5 text-center">
        <h1 className="text-3xl text-violet-950">Stock Management v1.0</h1>
        <ul className="space-y-2 mt-4">
          <li><a href="/product" className="text-blue-600 hover:text-blue-800 underline">Products</a></li>
          <li><a href="/category" className="text-blue-600 hover:text-blue-800 underline">Category</a></li>
          <li><a href="/customer" className="text-blue-600 hover:text-blue-800 underline">Customers</a></li>
        </ul>
        
      </Box>
    </main>
  );
}
