import ButtonEdit from "../components/profilepage/ButtonEdit";
import ContentCardComponent from "../components/card/ContentCardComponent";
import ButtonSave from "../components/profilepage/ButtonSave";
import ButtonYourPost from "../components/profilepage/ButtonYourPost";
import RandomBlog from "../components/card/RandomBlog";
import BookmarkedBlogs from "../components/profilepage/BookMarkedBlogs";

function Profile() {
  return (
    <>
      <ButtonEdit />
      {/* <ButtonSave /> */}
      <ButtonYourPost />
      <BookmarkedBlogs />
    </>
  );
}

export default Profile;
