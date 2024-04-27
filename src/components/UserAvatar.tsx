import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserAvatar = ({ email, image, size, className }: { email: string, image?: string, size?: string, className?: string}) => {
    const placeholderImage = `https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${email}`

    const finaleImage: string = image ? `https://api.dicebear.com/8.x/avataaars/svg?seed=${image}` :  placeholderImage

    return (
        <Avatar className={size ? `${size} ${className}` : `size-6 ${className}`}>
            <AvatarFallback>{email[0]}</AvatarFallback>
            <AvatarImage src={finaleImage} alt={`avatar`} />
        </Avatar>
    )
}