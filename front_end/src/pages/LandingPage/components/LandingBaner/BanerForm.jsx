import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useGetRootCategoriesQuery } from '../../../../store/api/categoryApi';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import { BrowserRouter  } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerButton = styled(Button)({
  width: 165,
  height: 50,
  borderStyle: 'none',
  cursor: 'pointer',
  '&.MuiButton-root': {
    backgroundColor: '#D08888',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
  },
});

const LocalizationProviderNew = styled(LocalizationProvider)`
  padding-top: 110px;
`;

const SearchPaper = styled(Paper)({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 476,
  marginTop: 30,
  marginLeft: 0.31,
});

const WrapperFilter = styled.div`
  margin-left: 5px;
`;
// margin-left: 200px;
//   margin-top: 50px;
const Wrapper = styled.div`
  width: 565px;
  height: 240px;
  margin-top: 35px;
  padding: 15px;
  background: rgba(217, 217, 217, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 10px;
`;

const WrapperCategory = styled.div``;

const BanerForm = () => {
  const navigate = useNavigate();

  const { data: rootCategory, isSuccess: success } =
    useGetRootCategoriesQuery();

  const [FormData, setFormData] = useState({
    date: new Date(),
    category: '',
    state: '',
    search: '',
    isSearch: false,
  });

  const date = `${FormData.date.getFullYear()}-${
    FormData.date.getMonth() + 1 < 10
      ? `0${FormData.date.getMonth() + 1}`
      : FormData.date.getMonth() + 1
  }-${
    FormData.date.getDate() < 10
      ? `0${FormData.date.getDate()}`
      : FormData.date.getDate()
  }`;

  const category = FormData.category;
  const state = FormData.state;
  const query = FormData.search;

  const searchQuery = `?${category ? `category=${category}` : ''}${
    state ? `&state=${state}` : ''
  }${date ? `&date=${date}` : ''}${query ? `&query=${query}` : ''}`;

  return (
    <Wrapper>
      <WrapperFilter>
        <WrapperCategory>
          <LocalizationProviderNew dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={FormData.date}
              onChange={(newValue) => {
                setFormData({ ...FormData, date: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" p1="true" />
              )}
            />
          </LocalizationProviderNew>
          <FormControl variant="standard" sx={{ ml: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              value={FormData.category}
              onChange={(e) =>
                setFormData({
                  ...FormData,
                  category: e.target.value,
                })
              }
              label="Age"
            >
              {success &&
                rootCategory.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ ml: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">
              State
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={FormData.state}
              onChange={(e) =>
                setFormData({
                  ...FormData,
                  state: e.target.value,
                })
              }
              label="Age"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={'NSW'}>NSW</MenuItem>
              <MenuItem value={'VIC'}>VIC</MenuItem>
              <MenuItem value={'QLD'}>QLD</MenuItem>
              <MenuItem value={'SA'}>SA</MenuItem>
              <MenuItem value={'TAS'}>TAS</MenuItem>
              <MenuItem value={'WA'}>WA</MenuItem>
              <MenuItem value={'ACT'}>ACT</MenuItem>
              <MenuItem value={'NT'}>NT</MenuItem>
            </Select>
          </FormControl>
        </WrapperCategory>
      </WrapperFilter>

      <SearchPaper component="form">
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Name, service ..."
          inputProps={{ 'aria-label': 'Name, service ...' }}
          value={FormData.search}
          onChange={(e) => {
            setFormData({ ...FormData, search: e.target.value });
          }}
        />
      </SearchPaper>

      <BannerButton
        variant="contained"
        disableRipple
        sx={{
          mt: 3,
        }}
        onClick={() => {
          navigate(`/StoreListPage${searchQuery}`);
        }}
      >
        SEARCH
      </BannerButton>
    </Wrapper>
  );
};

export default BanerForm;
