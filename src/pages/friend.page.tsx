import { useEffect, useState } from "react";
import FriendRequestCard from "../components/friend-request-card.component";
import { fetchFriendRequests } from "../services/friend-request.service";
import Loader from "../components/loaders/spinner/loader.component";
import { FriendRequest } from "../types/friend-request";
import AddFriend from "../components/add-friend.component";

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const removeFriendRequest = (friendRequest: FriendRequest) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== friendRequest.id)
    );
  };


  useEffect(() => {
    loadInitialRequests();

    const handleNewFriendRequest = (data: any) => {
      setFriendRequests(prevRequests => { return [data, ...prevRequests]; });
    };
    //
    // const eventSource = eventFetchFriendRequests(handleNewFriendRequest);
    //
    // return () => {
    //   eventSource.close();
    // };
  }, []);

  async function loadInitialRequests() {
    try {
      const requests = await fetchFriendRequests();
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error loading friend requests:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? <Loader /> : null}

      <div className="mx-auto flex justify-center mt-5">
        <div className="flex lg:flex-row md:flex-row sm:flex-col">
          <AddFriend />
          <div>
            {/* <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span> */}

            {friendRequests.map((request) => (
              <div key={request.id}>
                <FriendRequestCard request={request} removeFriendRequest={removeFriendRequest} />
              </div>
            ))}
          </div>
        </div>
      </div>




      {/* From test page
      <div className='flex justify-center items-center'>
        <div>
          <div className='adress-book-rim'>
            <div className='adress-book'>
              <h2 className='smiley'>&#9786;&#9787;</h2>
              <h1>Adress Book</h1>

              <div className='friend-code'>
                <p className='info-message'>This console's Wii number</p>
                <div className='flex items-center'>
                  <p className=''>k54fg15 4525df 4524g5f</p>
                </div>
              </div>
            </div>
          </div>

          <div className='add-friend-form'>
            <form action="">
              <div className='add-friend-form-header'>
                <p>Wii Number</p>
              </div>
              <input type="text" placeholder='Enter a Wii Number ...' />
            </form>
          </div>
        </div>

        <div className='friend-request-list'>
          <div className='friend-request-card'>
            <div className='friend-request-card-info'>
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffiverr-res.cloudinary.com%2Fimages%2Ft_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto%2Fgigs%2F55353524%2Foriginal%2F7892661bbe7146c7698d340085ce35e335e50c09%2Fcreate-a-wii-mii-profile-picture.jpg&f=1&nofb=1&ipt=451f0aff439af51981b4ceb34719ecf92fe888e28e751bafea4bdf7cdf7f61aa&ipo=images" alt="profil-picture" />
              <p>gf548f gfd5412 gdf568f</p>
            </div>
            <button>Accept</button>
          </div>
        </div>
      </div> */}









    </div>












  );
}