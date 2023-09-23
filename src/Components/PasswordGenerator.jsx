import React, { useState } from 'react'
const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(8);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUpperCase] = useState(true);


    const generateRandomPassword = () => {
        const lowerCaseCheck = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseCheck = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialCharacter = '!@#$%^&*()';
        let charset = '';
        if (lowercase) charset += lowerCaseCheck;
        if (uppercase) charset += upperCaseCheck;
        charset += specialCharacter;

        let newPassWord = '';
        for (let i = 0; i < passwordLength; i++) {
            const index = Math.floor(Math.random() * charset.length);
            newPassWord += charset[index];
        }
        return newPassWord;
    }

    const handleChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        setPasswordLength(newLength);
    }
    const handleLowerCase = () => {
        setLowercase(!lowercase)
    }

    const handleUpperCase = () => {
        setUpperCase(!uppercase)
    }

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword();
        setPassword(newPassword);
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(`${password}`)
            .then(() => {
                alert('Password copied success!')
            })
            .catch((err) => {
                console.error(err);
            })
    }


    return (
        <>

            <h2>Password Generator</h2>
            <div>
                <label>Password Length : {passwordLength}</label>
                <input type="range" min="6" max="20" step="1" value={passwordLength} onChange={handleChange} />
            </div>

            <div className='mid-div'>
                <div>
                    <input type="checkbox" checked={uppercase} onChange={handleUpperCase}
                    /> : UpperCase
                </div>
                <div>
                    <input type="checkbox" checked={lowercase} onChange={handleLowerCase}
                    /> : LowerCase
                </div>
            </div>


            <div>
                <button onClick={handleGeneratePassword}>Generate Password</button>
                <input type="text" value={password} readOnly />
                <button onClick={handleCopy}>Copy</button>
            </div>
        </>
    )
}

export default PasswordGenerator