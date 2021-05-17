import React from 'react';
import Col from 'react-bootstrap/Col';
import IconButton from '../../components/Icon.Button';
import { FaFacebookSquare } from 'react-icons/fa';
import {
  AiFillYoutube,
  AiFillRedditCircle,
  AiFillGithub
} from 'react-icons/ai';

const SocialLinksTray = ({
  youtubelink,
  githublink,
  facebooklink,
  redditlink
}) => (
  <>
    <IconButton
      size="lg"
      variant="outline-primary"
      link={youtubelink}
      icon={<FaFacebookSquare />}
    />
    <IconButton
      size="lg"
      variant="outline-danger"
      link={facebooklink}
      icon={<AiFillYoutube />}
    />
    <IconButton
      size="lg"
      variant="outline-secondary"
      link={redditlink}
      icon={<AiFillRedditCircle />}
    />

    <IconButton
      size="lg"
      variant="outline-dark"
      link={githublink}
      icon={<AiFillGithub />}
    />
  </>
);

export default SocialLinksTray;
