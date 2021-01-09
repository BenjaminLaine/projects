# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: blaine <blaine@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/10/16 15:46:27 by blaine            #+#    #+#              #
#    Updated: 2020/06/18 01:07:55 by blaine           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = ft_ls

SRC = ft_args.c ft_file1.c ft_file2.c ft_folders.c ft_init.c ft_is.c ft_ls.c ft_print.c ft_sort_args1.c ft_sort_args2.c ft_sort_files1.c ft_sort_files2.c
FLAGS = -Wall -Wextra -Werror
OBJ = $(subst .c,.o,$(SRC))
INC = includes
LIB = libft/libft.a

all: $(NAME)

$(NAME):
	make -C libft/
	gcc $(FLAGS) -c -I $(INC) $(SRC)
	gcc -o $(NAME) $(FLAGS) $(OBJ) $(LIB) -I $(INC)

clean:
	rm -rf $(OBJ)
	make clean -C libft/

fclean: clean
	rm -rf $(NAME)
	make fclean -C libft/

re: fclean all

.PHONY: clean fclean re all