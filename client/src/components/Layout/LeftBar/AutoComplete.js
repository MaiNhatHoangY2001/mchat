import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

export default function ComboBox({ users, renderInput }) {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={users === [] ? [""] : users.map((user) => user.userName)}
                renderInput={renderInput}
            />
        </Stack>
    );
}
