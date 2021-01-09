/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   check.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tdawson <tdawson@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/18 18:22:58 by blaine            #+#    #+#             */
/*   Updated: 2019/11/19 12:37:02 by tdawson          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void		ft_itos(int *numbers, int block_numbers, t_tetris ***blocks)
{
	t_tetris	**tmp;
	int			i;

	tmp = *blocks;
	if (!(tmp = (t_tetris**)malloc(sizeof(t_tetris) * (block_numbers + 1))))
		ft_error(6);
	tmp[block_numbers] = NULL;
	i = 0;
	while (i < block_numbers)
	{
		tmp[i] = ft_new_block(numbers[i], i);
		i++;
	}
	*blocks = tmp;
}

int			assign_blocks(char *str)
{
	int number;
	int count;
	int lines;
	int check;

	number = 0;
	lines = 5;
	count = 0;
	check = 0;
	while (*str)
	{
		if ((*str == '#') && (check = 1))
		{
			number = number * 10 + count;
			count = 0;
		}
		check == 1 ? count += 1 : count;
		if (*str == '\n')
			lines--;
		if (lines == 0)
			break ;
		str++;
	}
	(*(str - 1) == '\n') ? 1 : ft_error(666);
	return (number);
}

int			valid_block_marks(char *str, int count, int blocks)
{
	int dots;
	int lines;

	dots = 0;
	lines = 0;
	blocks = 0;
	count = 0;
	while (*str)
	{
		if ((*str != '\n') && (*str != '#') && (*str != '.'))
			ft_error(2);
		if ((*str == '#') && (++blocks))
			count += 1;
		if ((*str == '.') && (++dots))
			count += 1;
		if ((*str == '\n') && (++lines))
			(count == 4 || count == 0) ? count = 0 : ft_error(666);
		str++;
	}
	if (((lines / 5) != (blocks / 4)) || ((lines / 5) != (dots / 12)
	|| (lines % 5)))
		ft_error(3);
	lines /= 5;
	return (lines);
}

void		valid_block_number(int *numbers, int block_number)
{
	int i;

	i = -1;
	while (++i < block_number)
	{
		if (numbers[i] != 555 && numbers[i] != 111 && numbers[i] != 551 &&
			numbers[i] != 311 && numbers[i] != 155 && numbers[i] != 113 &&
			numbers[i] != 145 && numbers[i] != 511 && numbers[i] != 541 &&
			numbers[i] != 115 && numbers[i] != 141 && numbers[i] != 515 &&
			numbers[i] != 131 && numbers[i] != 414 && numbers[i] != 151 &&
			numbers[i] != 114 && numbers[i] != 514 && numbers[i] != 411 &&
			numbers[i] != 415)
		{
			ft_error(8);
		}
	}
}

int			read_blocks(int fd, t_tetris ***blocks)
{
	char	buf[548];
	char	*buf_ptr;
	int		block_number;
	int		numbers[26];
	int		ret;

	block_number = 0;
	while ((ret = read(fd, buf, 546)) > 0)
	{
		if (ret < 20 || ret > 545)
			ft_error(0);
		buf[ret] = '\n';
		buf[ret + 1] = '\0';
		block_number += ((ret + 1) / 21);
	}
	if (block_number == 0 || block_number > 26)
		ft_error(77);
	buf_ptr = buf;
	if (!(block_number == valid_block_marks(buf_ptr, block_number, ret)))
		ft_error(1);
	while ((ret < block_number) && (numbers[ret++] = assign_blocks(buf_ptr)))
		buf_ptr += 21;
	valid_block_number(numbers, block_number);
	ft_itos(numbers, block_number, blocks);
	return (block_number);
}
