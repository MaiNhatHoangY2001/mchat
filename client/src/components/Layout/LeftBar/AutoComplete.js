import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { getMsgs } from '../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import { createAxios } from '../../../redux/createInstance';
import { setIsGroupChat } from '../../../redux/groupChatSlice';
import { setSender } from '../../../redux/userSlice';

export default function ComboBox({ currentUser, users, renderInput }) {
    const dispatch = useDispatch();

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const handleGetUser = (sender) => {
        const actor = { sender: currentUser._id, user: sender._id };

        getMsgs(currentUser.accessToken, dispatch, actor, axiosJWT);
        dispatch(setSender(sender));
        dispatch(setIsGroupChat(false));
    };

    const getOptionLabel = (option) => {
        return option.profileName === undefined ? '' : option.profileName;
    };

    return (
        <Stack spacing={2}>
            <Autocomplete
                freeSolo
                id="search-user"
                disableClearable
                onChange={(event, value) => handleGetUser(value)}
                getOptionLabel={getOptionLabel}
                options={users}
                renderInput={renderInput}
            />
        </Stack>
    );
}
