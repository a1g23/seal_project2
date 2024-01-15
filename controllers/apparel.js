// import dependencies
const express = require("express")
const Apparel = require("../models/Apparel")

// Create the route

const router = express.Router()


// Routes

// seed route
router.get("/seed", async (req, res) => {
    try {
        // array of starter apparel
        const starterApparel = [
            {
              type: "T-shirt",
              brand: "Adidas",
              size: "M",
              nickname: "The Comfy One"
            },
            {
              type: "Jeans",
              brand: "Levi's",
              size: "W32 L32",
              nickname: "The Classics"
            },
            {
              type: "Hoodie",
              brand: "Nike",
              size: "L",
              nickname: "Cozy Nights"
            },
            {
              type: "Chinos",
              brand: "Banana Republic",
              size: "32",
              nickname: "Weekend Warriors"
            },
            {
              type: "Dress Shirt",
              brand: "Calvin Klein",
              size: "16",
              nickname: "Sharp Shooter"
            }
          ]
        // delete all Apparel
        await Apparel.deleteMany({})

        // add the starter apparel
        const seedApparel = await Apparel.create(starterApparel)

        //respose
        res.json(seedApparel)


    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})


// Index Route

router.get("/", async (req, res) => {
    try {
        // get the apparel from the db
        const apparel = await Apparel.find({})

        // render to index.ejs and send the apparel
        res.render("apparel/index.ejs", {apparel})

    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})

// New Route

router.get("/new", (req, res) => {
  // render the new.ejs form (no db request)
  res.render("apparel/new.ejs")
})

// Create Route

router.post("/", async (req, res) => {
    try {
        // grab the body from the form
        const newApparel = req.body
        // create the newApparel in db
        await Apparel.create(newApparel)
        // redirect to the index.ejs
        res.redirect("/mycloset")
      
    } catch (error) {
      res.send("There was an Error")
      console.log(error.message)
    }
})

// Edit Route

router.get("/:id/edit", async (req, res) => {
    try {
      // grab the ID of the apparel
      const id = req.params.id
      // find the item in the db
      const indyApparel = await Apparel.findById(id)
      // render the edit.ejs form and send over the indyApparel to use
      res.render("apparel/edit.ejs", {indyApparel})


    } catch (error) {
      res.send("There was an Error")
      console.log(error.message)
    }
})

// Update Route

router.put("/:id", async (req, res) => {
  try {
    // grab the ID of the apparel
    const id = req.params.id
    // find the new body
    const updatedApparel = req.body
    // update the apparel in the db
    await Apparel.findByIdAndUpdate(id, updatedApparel)
    // redirect to the show route of the updated apparel
    res.redirect(`/mycloset/${id}`)


  } catch (error) {
    res.send("There was an Error")
    console.log(error.message)
  }
})

// Delete Route

router.delete("/:id", async (req, res) => {
  try {
    // grab the ID of the apparel
    const id = req.params.id
    // find the apparel and delete it
    await Apparel.findByIdAndDelete(id)

    // redirect to my closet
    res.redirect("/mycloset")

  } catch (error) {
    res.send("There was an Error")
    console.log(error.message)
  }
})

// Show Route

router.get("/:id", async (req, res) => {
    try {
        // get the id from the params
        const id = req.params.id

        // find the apparel from the db
        const indyApparel = await Apparel.findById(id)

        // render to show.ejs and send the indyApparel
        res.render("apparel/show.ejs", {indyApparel})

    } catch (error) {
    res.send("There was an Error")
    console.log(error.message)
}
})

//export the router

module.exports = router