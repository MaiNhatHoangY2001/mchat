import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

import { url } from '../../../redux/createInstance';

//https://stackoverflow.com/questions/11404744/css-media-queries-max-width-or-max-height
//link: https://github.com/yocontra/react-responsive
import { useMediaQuery } from 'react-responsive';

//https://react-icons.github.io/react-icons
import {
    IoCopy,
    IoCall,
    IoMic,
    IoMicOffOutline,
    IoVideocam,
    IoVideocamOffOutline,
    IoVolumeHigh,
    IoVolumeMuteOutline,
    IoCallSharp,
} from 'react-icons/io5';
import { MdCallEnd } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';

//all links stream webRTC reactjs: 
//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
//https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/getAudioTracks
//https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
//https://stackoverflow.com/questions/35857576/webrtc-pause-and-resume-stream

const cx = classNames.bind(styles);

//link yt: https://www.youtube.com/watch?v=gnM3Ld6_upE&list=PLylRck1PF4D6EQxHfxfeU8nhMgrP4hrRR&index=69
//link stack: https://github.com/NikValdez/VideoChatTut
//link doc socket: https://socket.io/docs/v3/client-socket-instance
// const socket = io('http://localhost:8000');
const socket = io(url, {
    transports: ['websocket'],
    'Access-Control-Allow-Credentials': true,
});
function Call() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const [me, setMe] = useState('');
    const [currentStream, setCurrentStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        console.log(socket);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setCurrentStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on('me', (id) => {
            setMe(id);
            console.log('current socket id: ' + id);
        });

        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });

        console.log('width popup: ' + window.innerWidth);
        console.log('client width: ' + document.documentElement.clientWidth);

        console.log('height popup: ' + window.innerHeight);
        console.log('client height: ' + document.documentElement.clientHeight);
    }, []);

    const callUser = (id) => {
        if (id.trim() === null || id.trim().length === 0) setPlaceholderInputId('B???n ch??a nh???p m?? m???i!');
        else {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: currentStream,
            });
            peer.on('signal', (data) => {
                socket.emit('callUser', {
                    userToCall: id,
                    signalData: data,
                    from: me,
                    name: currentUser.profileName,
                });
            });
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            });
            socket.on('callAccepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;

            setFlag(true);
            setCopied('');
            setHeightContainerCenter('540px');
            setWidthOptionsCall('350px');
        }
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: currentStream,
        });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: caller });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;

        setCopied('');
        setFlag(true);
        setHeightContainerCenter('540px');
        setWidthOptionsCall('350px');
    };

    const leaveCall = () => {
        setCallEnded(true);
        socket.on('callEnded', () => {
            myVideo.current.srcObject.getTracks().forEach((track) => track.stop());
            myVideo.current.srcObject = null;
        });
        connectionRef.current.destroy();
    };

    // UI call
    const [clickShowId, setClickShowId] = useState('');
    const [mesSystem, setMessSystem] = useState('');
    const [copied, setCopied] = useState('');
    function checkShowId() {
        if (clickShowId.trim() === null || clickShowId.trim().length === 0) {
            setCopied('Kh??ng t??m th???y m?? ????? sao ch??p!');
            setMessSystem('rgb(255, 50, 50)');
        } else {
            setCopied('???? sao ch??p, vui l??ng chia s??? b???n b?? nh???p m?? m???i v?? g???i.');
            setMessSystem('yellowgreen');
        }
    }

    const [flag, setFlag] = useState(false);
    const [heightContainerCenter, setHeightContainerCenter] = useState('');
    const [placeholderInputId, setPlaceholderInputId] = useState('Nh???p m?? m???i c???a b???n b??');
    const [widthOptionsCall, setWidthOptionsCall] = useState('');

    //handle micro
    const [mic, setMic] = useState(true);
    function checkMic() {
        if (mic === true)
            myVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = false);
        if (mic === false)
            myVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = true);
    }

    //handle webcam
    const [webcam, setWebcam] = useState(true);
    const [showVid, setShowVid] = useState(true);
    function checkWebcam() {
        if (webcam === true && showVid === true) {
            myVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = false);
            setShowVid(false);
        }
        if (webcam === false && showVid === false) {
            myVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = true);
            setShowVid(true);
        }
    }

    //handle test only your mic 
    const [muteVoice, setMuteVoice] = useState(true);

    const widthBrowser = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : Screen.width;
    const systemZoom = widthBrowser / window.screen.availWidth;
    const widthPopupCeter = 500 / systemZoom;

    const isFullScreenDevice = useMediaQuery({ query: 'max-width: 100%' });

    return (
        <div className={cx('container-call')}>
            <div className={cx('container-top')}>
                <p className={cx('txtProfileName')}>{currentUser.profileName}</p>
                <span className={cx('imgLogoPageCall')}></span>
            </div>
            <div className={cx('container-center')} style={{ height: heightContainerCenter }}>
                <div style={{ alignSelf: 'center' }}>
                    <video
                        className={cx('videoCaller')}
                        playsInline
                        ref={myVideo}
                        autoPlay
                        muted={muteVoice}
                        style={{ display: showVid ? 'flex' : 'none' }}
                    />
                    <div className={cx('avaVideoCaller')} style={{ display: showVid ? 'none' : 'flex' }}></div>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    {callAccepted && !callEnded ? (
                        <video className={cx('videoReceiver')} playsInline ref={userVideo} autoPlay />
                    ) : null}
                    {!callAccepted && callEnded && null}
                </div>
            </div>
            <div className={cx('container-bottom')}>
                <div className={cx('myId')}>
                    <div className={cx('yourId')} style={{ display: !flag ? 'flex' : 'none' }}>
                        <Tooltip title="Nh???n ????? nh???n m?? m???i" placement="top" disableInteractive arrow>
                            <button className={cx('btnGetYourId')} onClick={() => setClickShowId(me)}>
                                M?? m???i
                            </button>
                        </Tooltip>
                        <input
                            defaultValue={clickShowId}
                            disabled
                            style={{ width: 250, height: 40, paddingLeft: 5, marginLeft: '2%', marginRight: '2%' }}
                        />
                        <CopyToClipboard
                            text={clickShowId}
                            style={{
                                paddingLeft: '2%',
                                paddingRight: '2%',
                                height: '2.5rem',
                                fontSize: '1rem',
                                color: '#fff',
                                backgroundColor: '#D57AD4',
                                borderColor: '#D57AD4',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                        >
                            {/* <IconContext.Provider value={{ color: '#D57AD4' }}><i><IoCopy /></i></IconContext.Provider> */}
                            {/* <Tooltip title="Nh???n ????? sao ch??p ID" placement="top" disableInteractive arrow> */}
                            <button onClick={() => checkShowId()}>???? Sao ch??p</button>
                            {/* </Tooltip> */}
                        </CopyToClipboard>
                    </div>
                    <div
                        className={cx('txtCopied')}
                        style={{ display: !flag ? 'block' : 'none', color: mesSystem, fontStyle: 'italic' }}
                    >
                        {copied}
                    </div>
                    <div className={cx('optionsCall')} style={{ width: widthOptionsCall, marginTop: '1.2%' }}>
                        <input
                            id="filled-basic"
                            placeholder={placeholderInputId}
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                            className={cx('stylePlaceholderInputId')}
                            style={{ display: !flag ? 'block' : 'none', width: 250, height: 40, paddingLeft: 5 }}
                        />

                        {/* btn test voice */}
                        {/* {muteVoice ? (
                            <Tooltip title="B???t th??? gi???ng" placement="top" disableInteractive arrow>
                                <button className={cx('btnTestVoice')} onClick={() => setMuteVoice(false)}>
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoVolumeMuteOutline size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="T???t th??? gi???ng" placement="top" disableInteractive arrow>
                                <button className={cx('btnTestVoice')} onClick={() => setMuteVoice(true)}>
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoVolumeHigh size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        )} */}

                        {/* btn micro */}
                        {mic ? (
                            <Tooltip title="B???n ??ang b???t mic, nh???n ????? t???t" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnMic')}
                                    onClick={() => {
                                        setMic(false);
                                        checkMic();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoMic size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="B???n ??ang t???t mic, nh???n ????? b???t" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnMic')}
                                    onClick={() => {
                                        setMic(true);
                                        checkMic();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoMicOffOutline size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        )}

                        {/* btn webcam */}
                        {webcam ? (
                            <Tooltip title="B???n ??ang b???t camera, nh???n ????? t???t" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnCam')}
                                    onClick={() => {
                                        setWebcam(false);
                                        checkWebcam();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoVideocam size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="B???n ??ang t???t camera, nh???n ????? b???t" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnCam')}
                                    onClick={() => {
                                        setWebcam(true);
                                        checkWebcam();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoVideocamOffOutline size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        )}

                        {/* btn end call */}
                        {callAccepted && !callEnded ? (
                            <Tooltip title="K???t th??c" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnEndCall')}
                                    onClick={() => {
                                        leaveCall();
                                        window.close();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <MdCallEnd size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="G???i" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnCall')}
                                    onClick={() => {
                                        callUser(idToCall);
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoCall size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div className={cx('viewAnswerCall')}>
                    {receivingCall && !callAccepted ? (
                        <div className={cx('caller')}>
                            <p className={cx('calling')}>
                                <b>{name} ??ang g???i...</b>
                            </p>
                            <Tooltip title="Nh???c m??y" placement="top" disableInteractive arrow>
                                <button
                                    className={cx('btnAnswerCall')}
                                    onClick={() => {
                                        answerCall();
                                    }}
                                >
                                    <IconContext.Provider value={{ color: '#fff' }}>
                                        <i>
                                            <IoCallSharp size={25} />
                                        </i>
                                    </IconContext.Provider>
                                </button>
                            </Tooltip>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Call;
