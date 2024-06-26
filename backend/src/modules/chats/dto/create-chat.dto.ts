import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class CreateChatDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string

    @ApiProperty()
    @IsBoolean()
    has_read: boolean
}