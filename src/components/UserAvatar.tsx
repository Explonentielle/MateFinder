import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserAvatar = ({ email, image, size }: { email: string, image?: string, size?: string}) => {
    const placeholderImage = `https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${email}`

    const finaleImage: string = image ? `https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${image}` :  placeholderImage

    return (
        <Avatar className={size ? `${size}` : `size-6`}>
            <AvatarFallback>{email[0]}</AvatarFallback>
            <AvatarImage src={finaleImage} alt={`avatar`} />
        </Avatar>
    )
}