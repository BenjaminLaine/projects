/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fillit.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/11 16:40:50 by tdawson           #+#    #+#             */
/*   Updated: 2019/11/19 17:57:43 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FILLIT_H
# define FILLIT_H
# include <unistd.h>
# include <stdlib.h>
# include <fcntl.h>

typedef struct		s_tetris
{
	char			c;
	int				block[3];
	int				x;
	int				y;
}					t_tetris;

t_tetris			*ft_new_block(int number, int order);

void				ft_error(int n);
void				ft_putchar(char c);
void				ft_putendl(const char *s);
void				ft_putstr(const char *str);
void				valid_block_number(int *numbers, int block_number);
void				board_play(char *board, t_tetris **blocks, int count);
void				block_on_board(char **board, t_tetris *b, int w, char c);
void				ft_itos(int *numbers, int block_number, t_tetris ***blocks);

char				*create_board(int width);
char				*ft_strnew(size_t size);

int					ft_sqrt(int n);
int					assign_blocks(char *str);
int					calc_start_size(int count);
int					read_blocks(int fd, t_tetris ***blocks);
int					valid_block_marks(char *str, int num1, int num2);
int					check_board(char *board, t_tetris *blocks, int w);
int					place_block(char *board, t_tetris **blocks, int w);

#endif
