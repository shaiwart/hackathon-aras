import React, { useState } from 'react';

const LoginPage = () => {
    const [authCode, setAuthCode] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const handleLogin = async () => {
        // Redirect the user to the Auth URL for authorization
        const authUrl = `http://localhost/InnovatorServer33/oauthserver/connect/authorize?` +
            `response_type=code&` +
            `client_id=InnovatorClient&` +
            `redirect_uri=http://localhost/InnovatorServer33/Client/OAuth/PopupCallback&` +
            `scope=openid Innovator offline_access&` +
            `code_challenge_method=S256&` +
            `code_challenge=${generateCodeChallenge()}`;

        window.location.href = authUrl;
    };

    const generateCodeChallenge = () => {
        // Ideally, you should generate a code verifier and hash it using SHA-256.
        // Here, we're returning a dummy string for simplicity.
        return "dummy_code_challenge";
    };

    const handleCallback = async () => {
        // Extract the authorization code from the callback URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        setAuthCode(code);

        if (code) {
            // Exchange the authorization code for an access token
            const tokenUrl = 'http://localhost/InnovatorServer33/oauthserver/connect/token';
            const data = {
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost/InnovatorServer33/Client/OAuth/PopupCallback',
                client_id: 'InnovatorClient',
                // code_verifier: 'dummy_code_verifier', // This should match the code verifier used earlier
            };

            try {
                const response = await fetch(tokenUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa('InnovatorClient:'),
                    },
                    body: new URLSearchParams(data).toString(),
                });

                const result = await response.json();
                setAccessToken(result.access_token);
            } catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        }
    };

    React.useEffect(() => {
        // Check if the page is loaded with an authorization code in the URL
        if (window.location.search.includes('code=')) {
            handleCallback();
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login Page</h1>
            {!authCode && (
                <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Login with OAuth 2.0
                </button>
            )}

            {authCode && !accessToken && <p>Exchanging authorization code for access token...</p>}

            {accessToken && (
                <div>
                    <h2>Access Token</h2>
                    <textarea value={accessToken} readOnly style={{ width: '100%', height: '100px' }} />
                </div>
            )}
        </div>
    );
};

export default LoginPage;
