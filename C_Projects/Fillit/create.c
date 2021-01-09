/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/18 19:28:19 by tdawson           #+#    #+#             */
/*   Updated: 2019/11/19 19:06:26 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

t_tetris	*ft_new_block(int number, int order)
{
	t_tetris	*new;
	int			tmpnum;

	new = NULL;
	tmpnum = number;
	if (!(new = (t_tetris*)malloc(sizeof(t_tetris))))
		ft_error(6);
	new->c = 65 + order;
	new->block[0] = (number / 100);
	tmpnum /= 10;
	tmpnum %= 10;
	new->block[1] = (tmpnum);
	new->block[2] = (number % 10);
	new->x = 0;
	new->y = 0;
	return (new);
}

char		*create_board(int width)
{
	char	*board;
	int		i;

	i = 0;
	if (!(board = ft_strnew(width * width + width)))
		ft_error(56);
	while (i < width * width + width)
	{
		if ((i + 1) % (width + 1) == 0)
			board[i] = '\n';
		else
			board[i] = '.';
		i++;
	}
	return (board);
}

int			calc_start_size(int count)
{
	int			start_size;
	int			n;
	static int	last;

	n = 0;
	while (!(ft_sqrt(count * 4 + n)))
		n++;
	start_size = ft_sqrt(count * 4 + n);
	if (last >= start_size)
		start_size = last + 1;
	last = start_size;
	return (start_size);
}
