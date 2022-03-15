import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PostContext } from '../../Context/post-context';

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewpost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN',
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = event =>
    setNewpost({ ...newPost, [event.target.name]: event.target.value });

  const handleClose = () => {
    setNewpost({
      title: '',
      description: '',
      url: '',
      status: 'TO LEARN',
    });
    setShowAddPostModal(false);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    handleClose();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <div>
      <Modal show={showAddPostModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className='my-3'>
              <Form.Control
                type='text'
                placeholder='Title'
                name='title'
                required
                aria-describedby='title'
                value={title}
                onChange={onChangeNewPostForm}
              />
              <Form.Text id='title' muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='description'
                name='description'
                required
                value={description}
                onChange={onChangeNewPostForm}
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Control
                type='text'
                placeholder='Youtube tutorial URL'
                name='url'
                value={url}
                onChange={onChangeNewPostForm}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancle
            </Button>
            <Button variant='primary' type='submit'>
              LearnIt!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPostModal;
