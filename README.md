# ultimate-OTP-addon

## Specifications

### Prerequisites
Since we're going to work in a bit/byte environment, we need mapping from k-bits to an (accepted) character.
The list of conventionally accepted characters are:

        A-Z (26 char)
        a-z (26 char)
        0-9 (10 char)
        ! @ # $ % ^ & * ( ) - _ (12 char)

for a total of 74 characters.

To ensure maximum entropy (like in a OTP) we need every bit combinaison to have its character representation, 
in this case, we would need to select 64 of them to make a 6bit -> char mapping.

We also assume a hash function H_l: {0,1}^* -> {0,1}^l

### Proposed Protocol
    ''''
    Setup of the protocol.
    k: the number of characters per password.
    '''
    Gen(k: uint): 
        l = 6 * k  # Length in bits
        instantiate H_l  # Hash function outputting l bits
        websiteToEncryptedPassword = map()  # [website -> encrypted password]

    '''
    Obtains the usable OTP derived from the user's password and the website.
    '''
    getOTP(userPassword: string, website: string):
        return H_l(userPassword || website)

    '''
    Gets (decrypted) website password.
    '''
    getDecryptedPassword(userPassword: string, website: string):
        if website not in websiteToEncryptedPassword:
            # Generate a uniformly random l-bit password to store (encrypt)
            randomPassword = randomBits(l)
            websiteToEncryptedPassword[website] = randomPassword
        otp = getOTP(userPassword, website)
        encryptedPassword = websiteToEncryptedPassword[website]
        return xor(otp, encryptedPassword)



## Security Model(s)
We're going to evaluate the proposed protocol under different Games that an Adversary A plays under some set of rules, and establish results and security garantees under assumptions.

Theses games are going to be presented from the hardest -> easiest to win from the adversary persepective.
### TODO

            
        