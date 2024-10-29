import {
  StyledToolbar,
  StyledToolbarBox,
  StyledToolbarContainer,
} from "./style/styled";

export const EditorToolbar = ({ children }: any) => {
  return (
    <StyledToolbar>
      <StyledToolbarContainer>
        <StyledToolbarBox>{children}</StyledToolbarBox>
      </StyledToolbarContainer>
    </StyledToolbar>
  );
};
