# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: blaine <blaine@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/11/11 16:43:27 by tdawson           #+#    #+#              #
#    Updated: 2019/11/19 17:50:53 by blaine           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = fillit

SRC = main.c solver.c check.c create.c libft.c
INC = ./
FLG = -Wall -Werror -Wextra
OBJ = $(SRC:.c=.o)

all: $(NAME)

$(NAME):
	gcc $(FLG) -I $(INC) -c $(SRC)
	gcc $(FLG) -I $(INC) $(OBJ) -o $(NAME)

clean:
	/bin/rm -f $(OBJ)

fclean: clean
	/bin/rm -f $(NAME)

re: fclean all

.PHONY: all clear fclean re
