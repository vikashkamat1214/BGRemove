import { createContext, useState } from "react";
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(0);
    const [image, setImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const loadCreditData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (data.success) {
                setCredit(data.credits);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading credits: " + error.message);
        }
    };

    const removeBg = async (selectedImage) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(selectedImage);
            setResultImage(null);
            navigate('/result');

            const token = await getToken();
            const formData = new FormData();
            formData.append('image', selectedImage);

            const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setResultImage(data.resultImage);
                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                }
            } else {
                toast.error(data.message);
                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                }
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Error removing background: " + error.message);
        }
    };

    const value = {
        credit,
        setCredit,
        loadCreditData,
        backendUrl,
        image,
        setImage,
        removeBg,
        resultImage,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
