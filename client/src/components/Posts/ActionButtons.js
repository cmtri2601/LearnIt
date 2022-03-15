import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';

import { PostContext } from '../../Context/post-context';

const ActionButtons = ({ _id, url }) => {
  const { findPost, deletePost, setShowUpdatePostModal } =
    useContext(PostContext);

  const deletePostHandler = async () => {
    await deletePost(_id);
  };

  const findPostHandler = () => {
    setShowUpdatePostModal(true);
    findPost(_id);
  };

  return (
    <div>
      <Button href={url} target='_blank' variant='white'>
        <img src={playIcon} alt='play' width='32' height='32' />
      </Button>
      <Button variant='white' onClick={findPostHandler}>
        <img src={editIcon} alt='edit' width='24' height='24' />
      </Button>
      <Button variant='white' onClick={deletePostHandler}>
        <img src={deleteIcon} alt='delete' width='24' height='24' />
      </Button>
    </div>
  );
};

export default ActionButtons;
