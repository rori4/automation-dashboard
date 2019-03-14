export default {
  items: [
    {
      name: "Home",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "Amazon Publishing Suite",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Add Book",
      url: "/books/add",
      icon: "icon-notebook"
    },
    {
      name: "Book List",
      url: "/books/list",
      icon: "icon-list"
    },
    {
      name: "Book Promotion",
      url: "/books/promote",
      icon: "icon-energy"
    },
    {
      title: true,
      name: "Udemy Publishing Suite",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "Add Course",
      url: "/courses/add",
      icon: "icon-camrecorder"
    },
    {
      name: "Course List",
      url: "/courses/list",
      icon: "icon-list"
    },
    {
      name: "Course Promotion",
      url: "/courses/promote",
      icon: "icon-energy"
    },
    {
      title: true,
      name: "Giveaway Publishing Suite",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "Add Giveaway",
      url: "/giveaways/add",
      icon: "icon-present"
    },
    {
      name: "Giveaway List",
      url: "/giveaways/list",
      icon: "icon-list"
    },
    {
      name: "Giveaway Promotion",
      url: "/giveaways/promote",
      icon: "icon-energy"
    }
  ]
};
