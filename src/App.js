import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";

import { fetchCountries } from "./api";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AreaChart from "./components/AreaChart";
import Box from "@material-ui/core/Box";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width: "50%",
  },
}));

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["indonesia"]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };

    fetchCountriesData();
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>

          <FormControl className={classes.formControl}>
            <Box textAlign="center" fontSize="20px" fontWeight="bold" style={{
              marginBottom: 20,
            }}>
              Select Country
            </Box>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem value={country.Slug}>{country.Country}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <AreaChart country={country}></AreaChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
