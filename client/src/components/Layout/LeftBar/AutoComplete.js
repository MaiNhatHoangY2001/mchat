import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { getIndividualChat } from '../../../redux/apiRequest/chatApiRequest';
import { addIndividualChatSuccess } from '../../../redux/chatSlice';
import { createAxios } from '../../../redux/createInstance';
import { setSender } from '../../../redux/userSlice';

export default function ComboBox({ currentUser, users, renderInput }) {
    const dispatch = useDispatch();

    let axiosJWTIndivi = createAxios(currentUser, dispatch, addIndividualChatSuccess);

    const handleGetUser = (sender) => {
        dispatch(setSender(sender));
        const actor = { idUser: currentUser._id, idSender: sender._id };

        getIndividualChat(currentUser.accessToken, actor, dispatch, axiosJWTIndivi);
    };

    const getOptionLabel = (option) => {
        return option?.userName === undefined ? '' : option?.userName;
    };

    return (
        <Stack spacing={2} sx={{ width: 400 }}>
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
