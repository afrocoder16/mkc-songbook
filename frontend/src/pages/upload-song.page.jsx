import MainBodyContainer from "../components/main-body-container.component";
import {
    Label,
    FileInput,
    TextInput,
    Select,
    Textarea,
    Button,
} from "flowbite-react";
import {
    Await,
    defer,
    Form,
    useLoaderData,
    useNavigate,
} from "react-router-dom";

import "./upload-song.styles.css";
import { getAllAlbums } from "../utils/api/album-api.util";
import { Suspense } from "react";
import CustomTailSpin from "../components/custom-tail-spin.component";

const UploadSongPage = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData();

    return (
        <MainBodyContainer title="Upload Song">
            <Suspense fallback={<CustomTailSpin />}>
                <Await resolve={loaderData.albums}>
                    {(albums) => (
                        <Form
                            className="flex-1 self-stretch flex flex-col py-3.5 px-5 gap-10 items-stretch"
                            method="POST"
                        >
                            <div className="grid grid-cols-2 gap-x-7 gap-y-2.5">
                                <div className="flex flex-col gap-2.5">
                                    <Label htmlFor="title" value="Song Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label
                                        htmlFor="song-number"
                                        value="Song Number"
                                    />
                                    <TextInput
                                        id="song-number"
                                        name="id"
                                        type="number"
                                        helperText="The number assigned to the song."
                                        min="1"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label
                                        htmlFor="album"
                                        value="Album Title (Optional)"
                                    />
                                    <Select
                                        id="album"
                                        name="album"
                                        helperText="The album the song belongs to."
                                    >
                                        <option value=""></option>
                                        {albums.map((album) => (
                                            <option
                                                key={album._id}
                                                value={album._id}
                                            >
                                                {album.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label
                                        htmlFor="video"
                                        value="Youtube Video Link (Optional)"
                                    />
                                    <TextInput
                                        id="album"
                                        name="album"
                                        type="url"
                                        helperText="The video link of the song if it has any."
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label
                                        htmlFor="audio-file"
                                        value="Upload Audio"
                                    />
                                    <FileInput
                                        id="audio-file"
                                        helperText="MP3 or AAC (MAX. 50 MBs)"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label htmlFor="chord" value="Chord" />
                                    <TextInput
                                        id="chord"
                                        name="chord"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label htmlFor="tempo" value="Tempo" />
                                    <TextInput
                                        id="tempo"
                                        name="tempo"
                                        type="number"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <Label htmlFor="rythm" value="Rythm" />
                                    <TextInput id="rythm" name="rythm" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2.5">
                                <Label htmlFor="lyrics" value="Lyrics" />
                                <Textarea
                                    id="lyrics"
                                    name="lyrics"
                                    className="flex-1"
                                />
                            </div>
                            <div className="flex justify-end gap-7">
                                <Button
                                    onClick={() => navigate(-1)}
                                    className="text-nowrap focus:ring-0 h-full border border-secondary text-secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="failure"
                                    className="text-nowrap focus:ring-0 h-full"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Await>
            </Suspense>
        </MainBodyContainer>
    );
};

export default UploadSongPage;

export const loader = () => {
    return defer({ albums: getAllAlbums(true) });
};
