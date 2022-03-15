import { useContext, useEffect } from 'react';
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from 'react-bootstrap';

import { PostContext } from '../Context/post-context';
import { AuthContext } from '../Context/auth-context';

import SinglePost from '../components/Posts/SinglePost';
import AddPostModal from '../components/Posts/AddPostModal';

import addIcon from '../assets/plus-circle-fill.svg';
import UpdatePostModal from '../components/Posts/UpdatePostModal';

const Dashboard = () => {
  const {
    postState: { posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast,
    setShowToast,
  } = useContext(PostContext);

  const {
    authState: { user },
  } = useContext(AuthContext);

  // Bug??? never stop
  useEffect(() => getPosts(), []);

  let body = null;

  if (postLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Card className='text-center mx-5 my-5'>
        <Card.Body>
          <Card.Title>Hi {user.username}</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button
            variant='primary'
            onClick={setShowAddPostModal.bind(this, true)}
          >
            LearnIt
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open add post modal */}
        <OverlayTrigger
          placement='left'
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className='btn-floating'
            variant='white'
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt='add post' width={60} height={60} />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      <UpdatePostModal />
      {/* After post is added, show toast  */}
      <Toast
        show={showToast.show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${showToast.type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          messaage: '',
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>{showToast.message}</Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
