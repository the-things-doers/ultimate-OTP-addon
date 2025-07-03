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
    '''setup of the protocol, k will be the number of characters per password'''
    Gen(k: uint): 
        l = 6*k
        instantiate H_l
        websiteToEncPassword = map() ## maps [website -> the stored (encrypted) password]

    '''obtains the usuable OTP, from user's password and website'''
    getOTP(string password,string website):
        return H_l(password || website) ##concatenates both

    '''gets (encrypted) website password'''
    getPaswword(string password,string website):
        if website not in websiteToEncPassword:
            password <-- {0,1}^l (uniformly distributed)
            websiteToEncPassword[website] = password
        otp = getOTP(password,website)
        password = websiteToEncPassword[website] 
        return otp XOR password ##applying otp


## Security Model(s)
We're going to evaluate the proposed protocol under different Games that an Adversary A plays under some set of rules, and establish results and security garantees under assumptions.

Theses games are going to be presented from the hardest -> easiest to win from the adversary persepective.
### TODO

            
        