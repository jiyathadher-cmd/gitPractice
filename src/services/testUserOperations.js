    // const User = require('../models/userModel'); // Assuming your model is in ./models/user.js

    // async function testUserOperations() {
    //   try {
    //     // Test pre-save hook (password hashing)
    //     const newUser = new User({
    //       name: 'John Doe',
    //       email: 'john.doe@example.com',
    //       password: 'mysecretpassword'
    //     });
    //     await newUser.save();
    //     console.log('New user saved:', newUser);
    //     // Verify password is hashed (it won't be plaintext)

    //     // Test instance method
    //     const isMatch = await newUser.comparePassword('mysecretpassword');
    //     console.log('Password match:', isMatch); // Should be true

    //     const profile = newUser.getPublicProfile();
    //     console.log('Public profile:', profile);

    //     // Test static method
    //     const foundUser = await User.findByEmail('john.doe@example.com');
    //     console.log('Found user by email:', foundUser);

    //     // Test post-remove hook
    //     await newUser.remove();
    //     console.log('User removed.'); // Check console for the post-remove log
    //   } catch (error) {
    //     console.error('Error during user operations:', error);
    //   } finally {
    //     mongoose.connection.close();
    //   }
    // }

    // testUserOperations();