import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../app/store";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  CardActions,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Rating,
} from "@mui/material";

export default function ViewRating() {
  const getRatingListOfUser = useStore((state) => state.getRatingListOfUser);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getRatingListOfUser(params.id);
    } else {
      const userId = useStore.getState().userId;
      getRatingListOfUser(userId);
    }
  }, []);

  const userRatingList = useStore((state) => state.userRatingList);

  console.log("userRatingList", userRatingList?.data);

  return (
    <>
      <Typography variant="h5">Rating</Typography>
      <Stack spacing={2}>
        {userRatingList?.data?.items?.length > 0 ? (
          userRatingList.data.items.map((item, index) => (
            <Card sx={{ minWidth: 275 }} key={index}>
              <CardHeader
                avatar={<Avatar>{item.senderName}</Avatar>}
                title= {item.senderName}
                subheader=""
              />

              <CardContent>
                <Typography>{item.feedback}</Typography>
                <Typography><Rating name="read-only" value={item.numberStars} readOnly /></Typography>
                <Typography>{item.createdAt}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No rating</Typography>
        )}
      </Stack>
    </>
  );
}
