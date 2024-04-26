import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slices/QuoteSlice";
import Card from "./componenets/Card";
import Drawer from "./componenets/Drawer";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";


function App() {
  const { quotes, loading } = useSelector((state) => state.quotes);
  const { filteredQuotes, agiya } = useSelector((state) => state.filterAuth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const displayQuotes = agiya ? filteredQuotes : quotes;

  const totalPages = Math.ceil(displayQuotes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, displayQuotes.length);
  const realData = displayQuotes.slice(startIndex, endIndex);

  const handleChangePage = (event, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Drawer display={displayQuotes}/>
        <div className="flex justify-end lg:p-[2rem] p-[1rem] gap-5">
          <h1>
            page ({currentPage}/{totalPages})
          </h1>
        </div>
        <div className="flex flex-wrap justify-center p-[2rem] gap-5 min-h-screen">
          {!loading ? (
            realData.map((obj) => (
              <Card quote={obj.quote} author={obj.author} key={obj.id} />
            ))
          ) : (
            <div className="flex justify-center place-items-center h-screen">
              <CircularProgress />
            </div>
          )}
        </div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ display: "flex", justifyContent: "center", paddingY: "2rem" }}
          shape="rounded"
        />
      </div>
    </>
  );
}

export default App;
