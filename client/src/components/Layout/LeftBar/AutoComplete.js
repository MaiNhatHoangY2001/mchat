import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function ComboBox({data, setTextSearchUser}) {
    return (
      <Autocomplete

        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search user" />}
        onChange={(e) => setTextSearchUser(e.target.value)}
      />
    );
}


