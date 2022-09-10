import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { setSender } from '../../../redux/userSlice';

export default function ComboBox({ users, renderInput }) {
    const dispatch = useDispatch();

    const handleGetUser = (user) => {
        dispatch(setSender(user));
        window.location.reload();
    };

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                clearOnBlur={false}
                disableClearable
                onChange={(event, value) => handleGetUser(value)}
                getOptionLabel={(option) => option.userName}
                options={users}
                renderInput={renderInput}
            />
        </Stack>
    );
}
