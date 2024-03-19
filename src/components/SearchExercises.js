import React, { useEffect, useState } from "react";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { exerciseOptions, fetchData } from "../utility/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExderciseData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      // console.log(bodyPartsData);
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExderciseData();
  }, []);

  const handleSearch = async() => {
    if (search) {

      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1300',exerciseOptions);

      const searchedExercises = exercisesData.filter(
        (item) =>
        item.name.toLowerCase().includes(search) ||
        item.equipment.toLowerCase().includes(search) ||
        item.target.toLowerCase().includes(search) ||
        item.bodyPart.toLowerCase().includes(search)
        );

        setSearch('');
        setExercises(searchedExercises);
        console.log(searchedExercises);
        console.log(exercisesData);

      }
  };

  return (
    <Stack justifyContent="center" mt="37px" p="20px" alignItems="center">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises <br /> You Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            textTransform: "none",
            bgcolor: "#ff2625",
            width: { lg: "170px", xs: "80px" },
            color: "#fff",
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          position: "relative",
          p: "20px",
          width: "100%",
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
