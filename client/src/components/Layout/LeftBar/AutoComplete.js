import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function ComboBox({data, setTextSearchUSer}) {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search user" />}
        onChange={(e) => setTextSearchUSer(e.target.value)}
      />
    );
}


