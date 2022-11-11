import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const socket = io('http://localhost:8000');
// const host = '../call';
// const socket = io('../call');
function Call() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    // let socket = useRef(null);
    // useEffect(() => {
    //     socket.current = io(host, {
    //        autoConnect: true,
    //     });
    //     console.log(socket.current);
    // }, [host]);

    // const [host, setHost] = useState(null);
    // useEffect(() => {
    //     const newSocket = io('http://localhost:3000/call');
    //     setHost(newSocket);

    //     return socket.disconnect();
    // }, []);

    // const socketRef = useRef();

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

    const [statusWebcam, setStatusWebcam] = useState(true);
    const [muteVoice, setMuteVoice] = useState(true);

    useEffect(() => {
        // const getDeviceMedia = async () => {
        //     const stream = await navigator.mediaDevices.getUserMedia({
        //         video: true,
        //         audio: true,
        //     });
        //     // setStream(stream);
        //     if (myVideo.current) {
        //         myVideo.current.srcObject = stream;
        //         // myVideo.current.play();
        //     }
        // };
        // getDeviceMedia();
        console.log(socket);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setCurrentStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on('me', (id) => {
            setMe(id);
            console.log('current socket id: ' +id);
        });

        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
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
                name: name,
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
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    // UI call
    const [widthVid, setWidthVid] = useState('');
    const [hieghtVid, setHeighthVid] = useState('');
    return (
        <div className={cx('container-call')}>
            <div className={cx('container-top')}>
                <p style={{ color: '#D57AD4' }}>{currentUser.profileName}</p>
            </div>
            <div className={cx('video-container')}>
                <div className={cx('videoCaller')}>
                    <video playsInline ref={myVideo} autoPlay muted={muteVoice} style={{ width: '80%' }} />
                </div>
                <div className={cx('videoReceiver')}>
                    {callAccepted && !callEnded ? (
                        <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
                    ) : null}
                </div>
            </div>
            <div className={cx('myId')}>
                <input
                    id="filled-basic"
                    placeholder="Name"
                    // label="Name"
                    // variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
                    <button color="primary" onClick={() => alert(me)}>
                        Get and Copy ID
                    </button>
                </CopyToClipboard>

                <input
                    id="filled-basic"
                    placeholder="ID to call"
                    // label="ID to call"
                    // variant="filled"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                />
                <div>
                    <button
                        onClick={() => {
                            setStatusWebcam(true);
                        }}
                    >
                        Show video
                    </button>
                    <button
                        onClick={() => {
                            setStatusWebcam(false);
                        }}
                    >
                        Hide video
                    </button>
                    <button onClick={() => setMuteVoice(false)}>Thử giọng</button>
                    <button onClick={() => setMuteVoice(true)}>Tắt thử giọng</button>
                    <button>Mở webcam</button>
                    <button>Tắt webcam</button>
                </div>
                <div className={cx('call-button')}>
                    {callAccepted && !callEnded ? (
                        <button color="secondary" onClick={leaveCall}>
                            End Call
                        </button>
                    ) : (
                        <button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            Phone icon
                        </button>
                    )}
                    {idToCall}
                </div>
            </div>
            <div>
                {receivingCall && !callAccepted ? (
                    <div className={cx('caller')}>
                        <h1>{name} is calling...</h1>
                        <button color="primary" onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Call;
