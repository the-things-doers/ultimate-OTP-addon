# ultimate-OTP-addon

### Main idea :
The funny idea was that given a super basic password like yoyo123, we would get the most insane
and secure password doing a simple xor to get a crazy password with very special characters like : "éàô (latin accent letters)... ∑ ∞ √ ∆ ≈ ≠ ∫ ∂
Ω π λ θ ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ § ¶ © ® ™ ° µ ¿ ¡ ¥ € £ † ‡" As well as usual letters, upper and lowercase, and digits.

Here is the goal : start from the same simple password -> binary string -> Xor with a randomized binary string of same len (OTP Key) -> Convert back to a string -> use this as a new password



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

### Bit to Char Proposition
Here are some ideas, and problems that come with them

1) Use usual unicode OR ASCII. Problem :
   1) some websites arent unicode friendly
   2) going through the xor, we might get invalid password arguments
2) Tidously encode each character to a bit string of a length where each possible char. can fit. Problem :
   1) We get rid of some entries and have to "maximise" entropy by hand (choose the set of char that max the entropy given a bit string size 6)
   2) Problem with either maintainability or expansion. Let's say in the future we gain new usable password char, we will have to change the whole mapping.

### Solution 1 Bit to Char
    '''
    Verifies if the randomized binary only contains password friendly characters
    '''
    isPassowrdFriendly(webPassword : String)
    
    '''
    Computes a valid Password
    '''
    
    

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
    Find a solution to bit to char, how to do it
            
        