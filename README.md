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


### 1. User Password Recovery Attack (UPRA)
The adversary is given query access to an oracle:

    getOTP(website: string):
        return getOTP(userPassword,website)    
for any websites of its choosing and has find userPassword.

**H_l is pre-image resistant => the protocol is UPRA secure**

Proof:

Querying the Oracle at `website = ""`, reduces to the pre-image resistance of H_l.

### 2. OTP Prediction Attack (OPA)
The adversary is given query access to the oracle:

    getOTP(website: string):
        return getOTP(userPassword, website)
for any websites of its choosing, and eventually outputs a pair `(website*,otp*)`; a website he hasn't queried and a one-time pad such that `otp*=H_l(userPassword ∣∣ website*)`

**H_l​ is a pseudorandom function (in the Random Oracle Model) => the protocol is OPA-secure.**

Proof:

If H_l behaves as a PRF, prior outputs for other website inputs yield no useful information about `H_l(userPassword ∣∣ website*)`.

### 3. User Password Recovery Attack Given k Decrypted Password (UPRA-[k]DP)
The adversary is given query access to the oracle:

    getOTP(website: string):
        return getOTP(userPassword, website)
and access to:
- k website strings `w1,...,wk`
- the associated decrypted password `p1,...,pk`


**H_l​ is a pseudorandom function (in the Random Oracle Model) and randomBits is truly uniformly random => the protocol is UPRA-[k]DP-secure.**


Proof:

Each encrypted passwor is sampled uniformly at random and independent of the user password. The xor of a pseudorandom OTP and a uniform random string yields a uniform random string. Therefore, the decrypted password reveals no information about the OTP (and hence about the userPassword) to the adversary.

## Implementation Specifications
TODO, specify implementation of H_l and randomBits (and others like the char map)
