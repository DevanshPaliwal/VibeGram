import styled from 'styled-components'

export const Container = styled.View`
    background-color: #fff;
    flex:1;
`;

export const Card = styled.View`
    background-color: #f9f9f9;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    margin-top:5px;
`;

export const UserInfo = styled.View`
    flex-direction:row;
    justify-content:flex-start;
    padding: 15px;
`

export const UserImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const UserInfoText = styled.View`
    flex-direction:column;
    justify-content:center;
    margin-left: 10px;
`

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    font-family: 'Lato-Regular';
    color: black;
`

export const PostTime = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    color: #666;
`

export const PostText = styled.Text`
    font-size: 14px;
    font-family: 'Lato-Regular';
    color: black;
    padding-left: 15px;
    padding-right: 15px;
`

export const PostImage = styled.Image`
    width: 100%;
    height: 250px;
    margin-top:15px;
`
export const Divider = styled.View`
    border-bottom-color:#dddddd;
    border-bottom-width:1px;
    width:92%;
    align-self:center;
    margin-top:15px;
`


export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content:center;
    border-radius:5px;
    padding: 2px 5px;
    
`

export const InteractionText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${props=>props.active?'#2364e5':'#333'};
    font-family: 'Lato-Regular';
    margin-left: 5px;
`