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
            {/* <ContentCardComponent imgContent={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"} />
            <ContentCardComponent imgContent={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"} />
            <ContentCardComponent imgContent={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"} /> */}
            {/* <ButtonSave /> */}
            <BookmarkedBlogs />
        </>
    );
}

export default Profile;