import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PostContext } from '../../Context/post-context';

const UpdatePostModal = () => {
  const {
    postState: { currentUpdatePost },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [post, setPost] = useState(currentUpdatePost);

  useEffect(() => {
    setPost(currentUpdatePost);
  }, [currentUpdatePost]);

  const { title, description, url, status } =
    post !== null
      ? post
      : { title: '', description: '', url: '', status: 'TO LEARN' };

  const onChangeUpdatePostForm = event =>
    setPost({ ...post, [event.target.name]: event.target.value });

  const handleClose = () => {
    //   setNewpost({
    //     title: '',
    //     description: '',
    //     url: '',
    //     status: 'TO LEARN',
    //   });
    setShowUpdatePostModal(false);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await updatePost(post);
    handleClose();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <div>
      <Modal show={showUpdatePostModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Making progress?</Modal.Title>
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
                onChange={onChangeUpdatePostForm}
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
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Control
                type='text'
                placeholder='Youtube tutorial URL'
                name='url'
                value={url}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Select
                name='status'
                value={status}
                onChange={onChangeUpdatePostForm}
              >
                <option value='TO LEARN'>TO LEARN</option>
                <option value='LEARNING'>LEARNING</option>
                <option value='LEARNED'>LEARNED</option>
              </Form.Select>
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

export default UpdatePostModal;
