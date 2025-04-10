import {
    Form,
    useActionData,
    useLocation,
    useNavigate,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import {
    Label,
    FileInput,
    TextInput,
    Select,
    Textarea,
    Button,
} from "flowbite-react";
import { useMemo, useState } from "react";
import CustomTailSpin from "./custom-tail-spin.component";

/**
 * Song Form Component
 *
 * A form component for creating and editing songs.
 * Includes fields for song details, music elements, album association, and media files.
 * Handles file validation and form submission with error handling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.albums - List of available albums for song association
 * @param {string} props.method - HTTP method for form submission (POST/PUT)
 * @param {string} props.action - Form submission endpoint
 * @param {Object} props.song - Existing song data for editing (optional)
 *
 * @example
 * return (
 *   <SongForm
 *     albums={albumsList}
 *     method="POST"
 *     action="/api/songs"
 *     song={existingSong}
 *   />
 * )
 */
const SongForm = ({ albums, method, action, song }) => {
    const submit = useSubmit();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const location = useLocation();
    const error = useActionData();

    /**
     * State for file input validation error message
     */
    const [fileInputErrorMessage, setFileInputErrorMessage] = useState("");

    /**
     * Handles file input changes and validates:
     * - File size (max 50MB)
     * - File type (MP3 or AAC only)
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
     */
    const fileInputChangeHandler = (e) => {
        if (
            e.target.files &&
            e.target.files[0] &&
            e.target.files[0].size > 50 * 1024 * 1024
        )
            return setFileInputErrorMessage(
                "File is too large. Maximum size is 50 MBs."
            );

        if (
            e.target.files &&
            e.target.files[0] &&
            e.target.files[0].type !== "audio/mpeg" &&
            e.target.files[0].type !== "audio/aac"
        )
            return setFileInputErrorMessage("Unsupported file type");
        setFileInputErrorMessage("");
    };

    /**
     * Handles form submission
     * Only submits if there are no file input errors
     *
     * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
     */
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!fileInputErrorMessage) return submit(e.target);
    };
    return (
        <Form
            className="flex-1 self-stretch flex flex-col py-3.5 px-5 gap-10 items-stretch"
            method={method}
            action={action}
            onSubmit={formSubmitHandler}
            encType="multipart/form-data"
        >
            <div className="grid grid-cols-2 gap-x-7 gap-y-2.5">
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="title" value="Song Title" />
                    <TextInput
                        id="title"
                        name="title"
                        type="text"
                        color={error?.titleMessage ? "failure" : undefined}
                        helperText={
                            <span className="text-sm">
                                {error?.titleMessage}
                            </span>
                        }
                        defaultValue={song?.title}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="song-number" value="Song Number" />
                    <TextInput
                        id="song-number"
                        name="id"
                        type="text"
                        helperText={
                            <span className="text-sm">
                                {error?.songNumberMessage
                                    ? error?.songNumberMessage
                                    : "The number assigned to the song."}
                            </span>
                        }
                        min="1"
                        color={error?.songNumberMessage ? "failure" : undefined}
                        defaultValue={song?._id}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="chord" value="Chord (Optional)" />
                    <TextInput
                        id="chord"
                        name="chord"
                        type="text"
                        defaultValue={song?.musicElements?.chord}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="tempo" value="Tempo (Optional)" />
                    <TextInput
                        id="tempo"
                        name="tempo"
                        type="number"
                        min="30"
                        color={
                            error?.tempoMessage
                                ? error?.tempoMessage
                                : undefined
                        }
                        helperText={
                            <span className="text-sm">
                                {error?.tempoMessage}
                            </span>
                        }
                        defaultValue={song?.musicElements?.tempo}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="rythm" value="Rythm (Optional)" />
                    <TextInput
                        id="rythm"
                        name="rythm"
                        defaultValue={song?.musicElements?.rythm}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="albums" value="Albums (Optional)" />
                    <Select
                        id="albums"
                        name="albums"
                        helperText="The album the song belongs to."
                        defaultValue={song?.albums ? song.albums : [""]}
                        multiple
                    >
                        <option value="">None</option>
                        {albums.map((album) => (
                            <option key={album._id} value={album._id}>
                                {album.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label
                        htmlFor="audio-file"
                        value="Upload Audio (Optional)"
                    />
                    <FileInput
                        id="audio-file"
                        name="audio-file"
                        onChange={fileInputChangeHandler}
                        helperText={
                            <span className="text-sm">
                                {fileInputErrorMessage
                                    ? fileInputErrorMessage
                                    : "MP3 or AAC (MAX. 50 MBs)"}
                            </span>
                        }
                        color={fileInputErrorMessage ? "failure" : undefined}
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label
                        htmlFor="video"
                        value="Youtube Video Link (Optional)"
                    />
                    <TextInput
                        id="video"
                        name="video-link"
                        type="url"
                        helperText={
                            <span className="text-sm">
                                {error?.videoLinkMessage
                                    ? error?.videoLinkMessage
                                    : "The video link of the song if it has any."}
                            </span>
                        }
                        color={error?.videoLinkMessage ? "failure" : undefined}
                        defaultValue={song?.youtubeLink}
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2.5">
                <Label htmlFor="lyrics" value="Lyrics" />
                <Textarea
                    id="lyrics"
                    name="lyrics"
                    className="min-h-28 text-lg resize-y"
                    color={error?.lyricsMessage ? "failure" : undefined}
                    helperText={
                        <span className="text-sm">{error?.lyricsMessage}</span>
                    }
                    defaultValue={song?.lyrics}
                />
            </div>
            <span className="text-sm text-secondary text-center">
                {error?.message}
            </span>
            <div className="flex justify-end gap-7">
                <Button
                    onClick={() => navigate(-1)}
                    className="text-nowrap focus:ring-0 h-full border border-secondary text-secondary px-7"
                >
                    Cancel
                </Button>
                <Button
                    color="failure"
                    className="text-nowrap focus:ring-0 h-full px-7"
                    type="submit"
                    isProcessing={navigation.state === "submitting"}
                    processingSpinner={<CustomTailSpin small white />}
                >
                    {location.pathname.includes("edit") ? "Update" : "Submit"}
                </Button>
            </div>
        </Form>
    );
};

export default SongForm;
