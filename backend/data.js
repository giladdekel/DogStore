import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Gilad",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Puma",
        logo: "/images/logo1.png",
        description: "best seller",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Reflective-Rain Coat Sunscreen",
      category: "Clothing",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description:
        "Pet Dog Waterproof Raincoat Jumpsuit Reflective Rain Coat Sunscreen Dog Outdoor Clothes Jacket for Small Dog",
    },
    {
      name: "Dog Coat Windbreaker",
      category: "Clothing",
      image: "/images/p2.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description:
        "Dog Clothes for Pet Dogs Raincoat for Dog Coat Windbreaker Fashion Reflective Clothing for Large Small",
    },
    {
      name: "Warm Puppy Dog Socks",
      category: "Clothing",
      image: "/images/p3.jpg",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description:
        "4pcs Warm Puppy Dog Socks Soft Pet Knits Socks Cute Cartoon Anti Slip Socks Warm Puppy",
    },
    {
      name: "Personalized Dog Tag Stainless Steel Name",
      category: "Collars",
      image: "/images/p4.jpg",
      price: 220,
      countInStock: 0,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description:
        "Personalized Dog Tag Stainless Steel Name Engraved ID Tags For Dog Collar Anti Lost Pet Nameplate",
    },
    {
      name: "USB Charging Led Dog Collar",
      category: "Collars",
      image: "/images/p5.jpg",
      price: 78,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description:
        "USB Charging Led Dog Collar Anti Lost Avoid Car Accident Collar For Dogs Puppies Dog Collars",
    },
    {
      name: "Nylon Dog Collar",
      category: "Collars",
      image: "/images/p6.jpg",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description:
        "Nylon Dog Collar Personalized Pet Collar Engraved ID Tag Nameplate Reflective for Small Medium Large Dogs",
    },
    {
      name: "Grooming Glove",
      category: "Grooming",
      image: "/images/p7.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "guante para gato dog Grooming Glove pet products mascotas cat Deshedding Hair Remove Cleaning Puppy Massage.",
    },
    {
      name: "Hair Removal Comb",
      category: "Grooming",
      image: "/images/p8.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Hair Removal Comb for Dogs Cat Detangler Fur Trimming Dematting Deshedding Brush Grooming Tool For matted",
    },
    {
      name: "Pet Nail Clipper Scissors",
      category: "Grooming",
      image: "/images/p9.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Pet Nail Clipper Scissors Pet Dog Cat Nail Toe Claw Clippers Scissors Trimmer Grooming Tools for",
    },

    {
      name: "Durable-Dog Training Bit",
      category: "Training",
      image: "/images/p10.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Durable Dog Training Bite Tug Pillow Sleeve with 2 Rope Handles for Training Malinois German-Shepherd",
    },
    {
      name: "Anti Barking Device",
      category: "Training",
      image: "/images/p11.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Pet Dog Anti Barking Device USB Electric Ultrasonic Dogs Training Collar Dog Stop Barking Vibration Anti",
    },
    {
      name: "Electric Dog Training Collars",
      category: "Training",
      image: "/images/p12.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Electric Dog Training Collar 800m Pet Remote Control Waterproof Rechargeable with LCD Display for All Size",
    },
    {
      name: "Super Soft Dog Bed Sofa",
      category: "Furniture",
      image: "/images/p13.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Super Soft Dog Bed Sofa Plush Cat Mat Dog Beds For Labradors Large Dogs Bed House",
    },
    {
      name: "Dog-Stairs",
      category: "Furniture",
      image: "/images/p14.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Dog Stairs Pet 3 Steps Stairs for Small Dog Cat Dog House Pet Ramp Ladder Anti",
    },
    {
      name: "Safety Enclosure Dog Fences",
      category: "Furniture",
      image: "/images/p15.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Pet Dog Fence Gate Safe Guard Safety Enclosure Dog Fences Dog Gate The Ingenious Mesh Magic",
    },
    {
      name: "Dog Carrier",
      category: "Carriers",
      image: "/images/p16.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Pet Dog Carrier Single Shoulder Bag Breathable Outdoor Travel Handbag Pouch Mesh Oxford Sling Comfort TravelTote",
    },
    {
      name: "CANDY KENNEL Black Footprint",
      category: "Carriers",
      image: "/images/p17.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "CANDY KENNEL Black Footprint Oxford Waterproof Pet Dog Cat Car Trunk Mat Carrier Cover Pet Mat",
    },
    {
      name: "Mesh Pet Dog Carrier Backpack",
      category: "Carriers",
      image: "/images/p18.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description:
        "Mesh Pet Dog Carrier Backpack Breathable Camouflage Outdoor Travel Products Bags For Small Dog Cat Chihuahua",
    },
  ],

  posts: [
    {
      name: "Winter's city side",
      category: "Clothing",

      image: "/images/b1.jpg",
      rating: 4.5,
      numComments: 10,
      author: "Gilad Dekel",
      authorImage: "/images/admin.jpg",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna turpis, fermentum nec scelerisque sit amet, fringilla lacinia magna. Etiam ac egestas nisl, et aliquet mauris. Maecenas et convallis enim. Etiam vitae euismod felis, eget ultricies erat. Sed fermentum, dui non aliquam fermentum, lacus tortor malesuada felis, sit amet porttitor velit nisi nec neque. Sed imperdiet est eget ligula auctor hendrerit. Donec commodo turpis eleifend orci ullamcorper, sed fermentum massa posuere. Pellentesque at est sit amet enim sagittis elementum eget eu lectus. Cras condimentum auctor imperdiet. Suspendisse hendrerit arcu vitae tempus sagittis. Aenean consectetur ante lectus, id ornare leo aliquet rutrum. Mauris gravida velit ultricies purus malesuada molestie. Quisque pretium erat et pretium luctus. Vivamus pulvinar sem eget mauris auctor, in lobortis erat tempus.

Ut laoreet pellentesque consequat. Vestibulum eu varius orci. Pellentesque nec urna dui. Praesent efficitur libero eros, id facilisis mauris condimentum eget. Integer aliquet consequat lectus, id tempus massa cursus vel. Integer tellus lectus, imperdiet sed fermentum quis, suscipit at tellus. Morbi lacus dolor, iaculis ac blandit consectetur, vestibulum a mi. Aenean euismod arcu consequat, posuere nisl sit amet, bibendum enim. Sed at magna pulvinar, suscipit sem quis, sollicitudin dolor. Pellentesque fringilla velit non ipsum elementum, in blandit est finibus. Praesent finibus, diam id luctus mattis, metus nunc feugiat ipsum, ut eleifend velit massa vitae lorem. Nunc commodo ipsum augue, quis ultricies enim tincidunt quis.

Mauris maximus augue augue. Proin laoreet odio vitae felis varius pulvinar. Ut eget dolor non nisi vehicula dapibus sed eu quam. Curabitur faucibus posuere urna, in ullamcorper nunc gravida at. Phasellus gravida felis a tortor sagittis pellentesque. Maecenas sollicitudin quam eu maximus venenatis. Nam tempus molestie lectus at vehicula. Nullam sit amet porttitor velit. Proin massa risus, pellentesque vitae semper et, facilisis vitae enim. Phasellus at mi auctor, viverra velit sed, interdum lorem.

Donec suscipit aliquam enim eu hendrerit. Nam vehicula est non sapien cursus, sed maximus lorem efficitur. Mauris orci libero, lobortis id quam at, volutpat dignissim eros. Sed consectetur non neque non volutpat. Praesent imperdiet orci nibh, at elementum dolor vehicula sed. Cras turpis turpis, pretium in dolor a, suscipit lobortis sapien. Ut bibendum urna a lobortis efficitur. Donec viverra consectetur nisi quis maximus. Aliquam eleifend augue mi, eget mollis mi eleifend non. Nulla eget ex sollicitudin, faucibus dolor sit amet, egestas magna. Donec euismod elementum orci eu convallis. Integer a tortor mauris. Curabitur tempor leo interdum iaculis aliquet. Maecenas quis enim eget est placerat auctor. Ut tincidunt interdum erat eu molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nunc ullamcorper, diam sed rutrum sodales, lorem enim fringilla nulla, vestibulum iaculis nibh est id mauris. Praesent vitae sem sit amet nunc sagittis laoreet. Duis sagittis feugiat nibh, vitae blandit eros porttitor ut. Mauris scelerisque, mi vel auctor pulvinar, elit urna feugiat nibh, sit amet gravida nunc lectus a risus. Sed porta dolor ac sapien porttitor luctus. Sed ligula tortor, convallis vel urna porta, pharetra egestas nisl. Phasellus ultricies ligula dignissim, maximus purus sed, viverra sapien. Sed dui lacus, dictum at lorem a, ornare gravida massa. Suspendisse et est placerat, porta est nec, interdum sem. Nullam vitae tortor sed libero euismod vehicula. Curabitur vulputate ullamcorper diam varius facilisis.`,
    },
    {
      name: "Your Dog love to Sleep?",
      category: "life",

      image: "/images/b2.jpg",
      rating: 4.5,
      numComments: 10,
      author: "Miki lev",
      authorImage: "/images/admin.jpg",

      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna turpis, fermentum nec scelerisque sit amet, fringilla lacinia magna. Etiam ac egestas nisl, et aliquet mauris. Maecenas et convallis enim. Etiam vitae euismod felis, eget ultricies erat. Sed fermentum, dui non aliquam fermentum, lacus tortor malesuada felis, sit amet porttitor velit nisi nec neque. Sed imperdiet est eget ligula auctor hendrerit. Donec commodo turpis eleifend orci ullamcorper, sed fermentum massa posuere. Pellentesque at est sit amet enim sagittis elementum eget eu lectus. Cras condimentum auctor imperdiet. Suspendisse hendrerit arcu vitae tempus sagittis. Aenean consectetur ante lectus, id ornare leo aliquet rutrum. Mauris gravida velit ultricies purus malesuada molestie. Quisque pretium erat et pretium luctus. Vivamus pulvinar sem eget mauris auctor, in lobortis erat tempus.

Ut laoreet pellentesque consequat. Vestibulum eu varius orci. Pellentesque nec urna dui. Praesent efficitur libero eros, id facilisis mauris condimentum eget. Integer aliquet consequat lectus, id tempus massa cursus vel. Integer tellus lectus, imperdiet sed fermentum quis, suscipit at tellus. Morbi lacus dolor, iaculis ac blandit consectetur, vestibulum a mi. Aenean euismod arcu consequat, posuere nisl sit amet, bibendum enim. Sed at magna pulvinar, suscipit sem quis, sollicitudin dolor. Pellentesque fringilla velit non ipsum elementum, in blandit est finibus. Praesent finibus, diam id luctus mattis, metus nunc feugiat ipsum, ut eleifend velit massa vitae lorem. Nunc commodo ipsum augue, quis ultricies enim tincidunt quis.

Mauris maximus augue augue. Proin laoreet odio vitae felis varius pulvinar. Ut eget dolor non nisi vehicula dapibus sed eu quam. Curabitur faucibus posuere urna, in ullamcorper nunc gravida at. Phasellus gravida felis a tortor sagittis pellentesque. Maecenas sollicitudin quam eu maximus venenatis. Nam tempus molestie lectus at vehicula. Nullam sit amet porttitor velit. Proin massa risus, pellentesque vitae semper et, facilisis vitae enim. Phasellus at mi auctor, viverra velit sed, interdum lorem.

Donec suscipit aliquam enim eu hendrerit. Nam vehicula est non sapien cursus, sed maximus lorem efficitur. Mauris orci libero, lobortis id quam at, volutpat dignissim eros. Sed consectetur non neque non volutpat. Praesent imperdiet orci nibh, at elementum dolor vehicula sed. Cras turpis turpis, pretium in dolor a, suscipit lobortis sapien. Ut bibendum urna a lobortis efficitur. Donec viverra consectetur nisi quis maximus. Aliquam eleifend augue mi, eget mollis mi eleifend non. Nulla eget ex sollicitudin, faucibus dolor sit amet, egestas magna. Donec euismod elementum orci eu convallis. Integer a tortor mauris. Curabitur tempor leo interdum iaculis aliquet. Maecenas quis enim eget est placerat auctor. Ut tincidunt interdum erat eu molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nunc ullamcorper, diam sed rutrum sodales, lorem enim fringilla nulla, vestibulum iaculis nibh est id mauris. Praesent vitae sem sit amet nunc sagittis laoreet. Duis sagittis feugiat nibh, vitae blandit eros porttitor ut. Mauris scelerisque, mi vel auctor pulvinar, elit urna feugiat nibh, sit amet gravida nunc lectus a risus. Sed porta dolor ac sapien porttitor luctus. Sed ligula tortor, convallis vel urna porta, pharetra egestas nisl. Phasellus ultricies ligula dignissim, maximus purus sed, viverra sapien. Sed dui lacus, dictum at lorem a, ornare gravida massa. Suspendisse et est placerat, porta est nec, interdum sem. Nullam vitae tortor sed libero euismod vehicula. Curabitur vulputate ullamcorper diam varius facilisis.`,
    },
    {
      name: "Your Dog is smart then you",
      category: "general",
      image: "/images/b3.jpg",
      rating: 4.5,
      numComments: 10,
      author: "Dodo Zar",
      authorImage: "/images/admin.jpg",

      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna turpis, fermentum nec scelerisque sit amet, fringilla lacinia magna. Etiam ac egestas nisl, et aliquet mauris. Maecenas et convallis enim. Etiam vitae euismod felis, eget ultricies erat. Sed fermentum, dui non aliquam fermentum, lacus tortor malesuada felis, sit amet porttitor velit nisi nec neque. Sed imperdiet est eget ligula auctor hendrerit. Donec commodo turpis eleifend orci ullamcorper, sed fermentum massa posuere. Pellentesque at est sit amet enim sagittis elementum eget eu lectus. Cras condimentum auctor imperdiet. Suspendisse hendrerit arcu vitae tempus sagittis. Aenean consectetur ante lectus, id ornare leo aliquet rutrum. Mauris gravida velit ultricies purus malesuada molestie. Quisque pretium erat et pretium luctus. Vivamus pulvinar sem eget mauris auctor, in lobortis erat tempus.

Ut laoreet pellentesque consequat. Vestibulum eu varius orci. Pellentesque nec urna dui. Praesent efficitur libero eros, id facilisis mauris condimentum eget. Integer aliquet consequat lectus, id tempus massa cursus vel. Integer tellus lectus, imperdiet sed fermentum quis, suscipit at tellus. Morbi lacus dolor, iaculis ac blandit consectetur, vestibulum a mi. Aenean euismod arcu consequat, posuere nisl sit amet, bibendum enim. Sed at magna pulvinar, suscipit sem quis, sollicitudin dolor. Pellentesque fringilla velit non ipsum elementum, in blandit est finibus. Praesent finibus, diam id luctus mattis, metus nunc feugiat ipsum, ut eleifend velit massa vitae lorem. Nunc commodo ipsum augue, quis ultricies enim tincidunt quis.

Mauris maximus augue augue. Proin laoreet odio vitae felis varius pulvinar. Ut eget dolor non nisi vehicula dapibus sed eu quam. Curabitur faucibus posuere urna, in ullamcorper nunc gravida at. Phasellus gravida felis a tortor sagittis pellentesque. Maecenas sollicitudin quam eu maximus venenatis. Nam tempus molestie lectus at vehicula. Nullam sit amet porttitor velit. Proin massa risus, pellentesque vitae semper et, facilisis vitae enim. Phasellus at mi auctor, viverra velit sed, interdum lorem.

Donec suscipit aliquam enim eu hendrerit. Nam vehicula est non sapien cursus, sed maximus lorem efficitur. Mauris orci libero, lobortis id quam at, volutpat dignissim eros. Sed consectetur non neque non volutpat. Praesent imperdiet orci nibh, at elementum dolor vehicula sed. Cras turpis turpis, pretium in dolor a, suscipit lobortis sapien. Ut bibendum urna a lobortis efficitur. Donec viverra consectetur nisi quis maximus. Aliquam eleifend augue mi, eget mollis mi eleifend non. Nulla eget ex sollicitudin, faucibus dolor sit amet, egestas magna. Donec euismod elementum orci eu convallis. Integer a tortor mauris. Curabitur tempor leo interdum iaculis aliquet. Maecenas quis enim eget est placerat auctor. Ut tincidunt interdum erat eu molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nunc ullamcorper, diam sed rutrum sodales, lorem enim fringilla nulla, vestibulum iaculis nibh est id mauris. Praesent vitae sem sit amet nunc sagittis laoreet. Duis sagittis feugiat nibh, vitae blandit eros porttitor ut. Mauris scelerisque, mi vel auctor pulvinar, elit urna feugiat nibh, sit amet gravida nunc lectus a risus. Sed porta dolor ac sapien porttitor luctus. Sed ligula tortor, convallis vel urna porta, pharetra egestas nisl. Phasellus ultricies ligula dignissim, maximus purus sed, viverra sapien. Sed dui lacus, dictum at lorem a, ornare gravida massa. Suspendisse et est placerat, porta est nec, interdum sem. Nullam vitae tortor sed libero euismod vehicula. Curabitur vulputate ullamcorper diam varius facilisis.`,
    },
    {
      name: "Dog life for me",
      category: "general",
      image: "/images/b4.jpg",
      rating: 4.5,
      numComments: 10,
      author: "Elton Ron",
      authorImage: "/images/admin.jpg",

      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna turpis, fermentum nec scelerisque sit amet, fringilla lacinia magna. Etiam ac egestas nisl, et aliquet mauris. Maecenas et convallis enim. Etiam vitae euismod felis, eget ultricies erat. Sed fermentum, dui non aliquam fermentum, lacus tortor malesuada felis, sit amet porttitor velit nisi nec neque. Sed imperdiet est eget ligula auctor hendrerit. Donec commodo turpis eleifend orci ullamcorper, sed fermentum massa posuere. Pellentesque at est sit amet enim sagittis elementum eget eu lectus. Cras condimentum auctor imperdiet. Suspendisse hendrerit arcu vitae tempus sagittis. Aenean consectetur ante lectus, id ornare leo aliquet rutrum. Mauris gravida velit ultricies purus malesuada molestie. Quisque pretium erat et pretium luctus. Vivamus pulvinar sem eget mauris auctor, in lobortis erat tempus.

Ut laoreet pellentesque consequat. Vestibulum eu varius orci. Pellentesque nec urna dui. Praesent efficitur libero eros, id facilisis mauris condimentum eget. Integer aliquet consequat lectus, id tempus massa cursus vel. Integer tellus lectus, imperdiet sed fermentum quis, suscipit at tellus. Morbi lacus dolor, iaculis ac blandit consectetur, vestibulum a mi. Aenean euismod arcu consequat, posuere nisl sit amet, bibendum enim. Sed at magna pulvinar, suscipit sem quis, sollicitudin dolor. Pellentesque fringilla velit non ipsum elementum, in blandit est finibus. Praesent finibus, diam id luctus mattis, metus nunc feugiat ipsum, ut eleifend velit massa vitae lorem. Nunc commodo ipsum augue, quis ultricies enim tincidunt quis.

Mauris maximus augue augue. Proin laoreet odio vitae felis varius pulvinar. Ut eget dolor non nisi vehicula dapibus sed eu quam. Curabitur faucibus posuere urna, in ullamcorper nunc gravida at. Phasellus gravida felis a tortor sagittis pellentesque. Maecenas sollicitudin quam eu maximus venenatis. Nam tempus molestie lectus at vehicula. Nullam sit amet porttitor velit. Proin massa risus, pellentesque vitae semper et, facilisis vitae enim. Phasellus at mi auctor, viverra velit sed, interdum lorem.

Donec suscipit aliquam enim eu hendrerit. Nam vehicula est non sapien cursus, sed maximus lorem efficitur. Mauris orci libero, lobortis id quam at, volutpat dignissim eros. Sed consectetur non neque non volutpat. Praesent imperdiet orci nibh, at elementum dolor vehicula sed. Cras turpis turpis, pretium in dolor a, suscipit lobortis sapien. Ut bibendum urna a lobortis efficitur. Donec viverra consectetur nisi quis maximus. Aliquam eleifend augue mi, eget mollis mi eleifend non. Nulla eget ex sollicitudin, faucibus dolor sit amet, egestas magna. Donec euismod elementum orci eu convallis. Integer a tortor mauris. Curabitur tempor leo interdum iaculis aliquet. Maecenas quis enim eget est placerat auctor. Ut tincidunt interdum erat eu molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nunc ullamcorper, diam sed rutrum sodales, lorem enim fringilla nulla, vestibulum iaculis nibh est id mauris. Praesent vitae sem sit amet nunc sagittis laoreet. Duis sagittis feugiat nibh, vitae blandit eros porttitor ut. Mauris scelerisque, mi vel auctor pulvinar, elit urna feugiat nibh, sit amet gravida nunc lectus a risus. Sed porta dolor ac sapien porttitor luctus. Sed ligula tortor, convallis vel urna porta, pharetra egestas nisl. Phasellus ultricies ligula dignissim, maximus purus sed, viverra sapien. Sed dui lacus, dictum at lorem a, ornare gravida massa. Suspendisse et est placerat, porta est nec, interdum sem. Nullam vitae tortor sed libero euismod vehicula. Curabitur vulputate ullamcorper diam varius facilisis.`,
    },
    {
      name: "The Cool Dogs you Ever See",
      category: "general",
      image: "/images/b5.jpg",
      rating: 4.5,
      numComments: 10,
      author: "Elton Ron",
      authorImage: "/images/admin.jpg",

      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Donec magna turpis, fermentum nec scelerisque sit amet, fringilla lacinia magna. Etiam ac egestas nisl, et aliquet mauris. 
      Maecenas et convallis enim. Etiam vitae euismod felis, eget ultricies erat. Sed fermentum, dui non aliquam fermentum, lacus tortor malesuada felis, sit amet porttitor velit nisi nec neque. Sed imperdiet est eget ligula auctor hendrerit. Donec commodo turpis eleifend orci ullamcorper, sed fermentum massa posuere. Pellentesque at est sit amet enim sagittis elementum eget eu lectus. Cras condimentum auctor imperdiet. Suspendisse hendrerit arcu vitae tempus sagittis. Aenean consectetur ante lectus, id ornare leo aliquet rutrum. Mauris gravida velit ultricies purus malesuada molestie. Quisque pretium erat et pretium luctus. Vivamus pulvinar sem eget mauris auctor, in lobortis erat tempus.

Ut laoreet pellentesque consequat. Vestibulum eu varius orci.
 Pellentesque nec urna dui. Praesent efficitur libero eros, id facilisis mauris condimentum eget. Integer aliquet consequat lectus, id tempus massa cursus vel. Integer tellus lectus, imperdiet sed fermentum quis, suscipit at tellus. Morbi lacus dolor, iaculis ac blandit consectetur, vestibulum a mi. Aenean euismod arcu consequat, posuere nisl sit amet, bibendum enim. Sed at magna pulvinar, suscipit sem quis, sollicitudin dolor. Pellentesque fringilla velit non ipsum elementum, in blandit est finibus. Praesent finibus, diam id luctus mattis, metus nunc feugiat ipsum, ut eleifend velit massa vitae lorem. Nunc commodo ipsum augue, quis ultricies enim tincidunt quis.

Mauris maximus augue augue. Proin laoreet odio vitae felis varius pulvinar. 
Ut eget dolor non nisi vehicula dapibus sed eu quam. Curabitur faucibus posuere urna, in ullamcorper nunc gravida at. Phasellus gravida felis a tortor sagittis pellentesque. Maecenas sollicitudin quam eu maximus venenatis. Nam tempus molestie lectus at vehicula. Nullam sit amet porttitor velit. Proin massa risus, pellentesque vitae semper et, facilisis vitae enim. Phasellus at mi auctor, viverra velit sed, interdum lorem.

Donec suscipit aliquam enim eu hendrerit. Nam vehicula est non sapien cursus, sed maximus lorem efficitur. Mauris orci libero, lobortis id quam at, volutpat dignissim eros. Sed consectetur non neque non volutpat. Praesent imperdiet orci nibh, at elementum dolor vehicula sed. Cras turpis turpis, pretium in dolor a, suscipit lobortis sapien. Ut bibendum urna a lobortis efficitur. Donec viverra consectetur nisi quis maximus. Aliquam eleifend augue mi, eget mollis mi eleifend non. Nulla eget ex sollicitudin, faucibus dolor sit amet, egestas magna. Donec euismod elementum orci eu convallis. Integer a tortor mauris. Curabitur tempor leo interdum iaculis aliquet. Maecenas quis enim eget est placerat auctor. Ut tincidunt interdum erat eu molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nunc ullamcorper, diam sed rutrum sodales, lorem enim fringilla nulla, vestibulum iaculis nibh est id mauris.
 Praesent vitae sem sit amet nunc sagittis laoreet. Duis sagittis feugiat nibh, vitae blandit eros porttitor ut. Mauris scelerisque, mi vel auctor pulvinar, elit urna feugiat nibh, sit amet gravida nunc lectus a risus. Sed porta dolor ac sapien porttitor luctus. Sed ligula tortor, convallis vel urna porta, pharetra egestas nisl. Phasellus ultricies ligula dignissim, maximus purus sed, viverra sapien. Sed dui lacus, dictum at lorem a, ornare gravida massa. Suspendisse et est placerat, porta est nec, interdum sem. Nullam vitae tortor sed libero euismod vehicula. Curabitur vulputate ullamcorper diam varius facilisis.`,
    },
  ],
};
export default data;
