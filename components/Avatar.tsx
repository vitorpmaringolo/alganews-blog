import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import avatar from "../public/avatar.jpeg";

interface AvatarProps {
  src: string;
}

export default function Avatar(props: AvatarProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Wrapper>
      <StyledAvatar
        src={src}
        width={40}
        height={40}
        onError={(e) => {
          setSrc(avatar.src);
        }}
      />
    </Wrapper>
  );
}

const StyledAvatar = styled(Image)`
  object-fit: cover;
`;

const Wrapper = styled.div`
  border-radius: 20px;
  box-shadow: 0 0 0 4px ${(p) => p.theme.primaryForeground};
  height: 40px;
  width: 40px;
  overflow: hidden;
`;
